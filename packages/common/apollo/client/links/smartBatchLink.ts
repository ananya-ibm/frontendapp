/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-param-reassign, no-plusplus, consistent-return, no-continue, no-labels */

import { FetchResult, NextLink, Observable, Operation } from '@apollo/client';
import { BatchHandler, BatchLink } from '@apollo/client/link/batch';
import {
  FieldNode,
  FragmentDefinitionNode,
  NameNode,
  OperationDefinitionNode,
  SelectionSetNode,
  ValueNode,
  VariableDefinitionNode,
  VariableNode
} from 'graphql';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

const MAX_GROUP_SIZE = 10;

// TODO: Check for any directives - will make it not feasible for merge

const getOpDefs = (o: Operation) =>
  o.query.definitions.filter((d): d is OperationDefinitionNode => d.kind === 'OperationDefinition');

const getFragmentDefs = (o: Operation) =>
  o.query.definitions.filter((d): d is FragmentDefinitionNode => d.kind === 'FragmentDefinition');

const getVarDef = (defs: readonly VariableDefinitionNode[] | undefined, name: string) =>
  defs?.find((vd) => vd.variable.name.value === name)!;

const makeObservable = <T>(
  sources: Observable<T>[],
  newOperations: Operation[],
  operations: Operation[],
  indexes: number[][]
) => {
  return new Observable<T[]>((observer) => {
    const queues: any[][] = sources.map(() => []);
    const isDone = (s: any[]) =>
      queues.some((q, i) => q.length === 0 && s[i].closed);

    const subscriptions = sources.map((source, index) =>
      Observable.from(source).subscribe({
        next(v) {
          queues[index].push(v);

          if (queues.every((q) => q.length > 0)) {
            const res: any[] = [];
            queues
              .map((q) => q.shift())
              .forEach((ir, i) => {
                indexes[i].forEach((destIdx) => {
                  res[destIdx] = cloneDeep(ir);
                  operations[destIdx].setContext({
                    response: newOperations[i].getContext().response
                  });
                });
              });

            observer.next(res);
            if (isDone(subscriptions)) observer.complete();
          }
        },
        error(e) {
          observer.error(e);
        },
        complete() {
          if (isDone(subscriptions)) observer.complete();
        }
      })
    );

    return () => subscriptions.forEach((s) => s.unsubscribe());
  });
};

type Arg = {
  value: any;
  type: ValueNode;
  variableName?: string;
  variableDef?: VariableDefinitionNode;
};

type Entry = { parent: string; name: string } & (
  | { kind: 'func'; args: Record<string, Arg> }
  | { kind: 'field' | 'fragment' | 'inline-fragment' }
);

const getSelections = (
  ss: SelectionSetNode | undefined,
  path: string,
  dest: Record<string, Entry>,
  variables: Record<string, any>,
  variableDefs: readonly VariableDefinitionNode[] | undefined
): Record<string, Entry> => {
  if (!ss) return dest;

  for (const s of ss.selections) {
    if (s.kind === 'Field') {
      const cur = `${path}.${s.name.value}`;
      if (s.arguments && s.arguments.length > 0) {
        const args: Record<string, Arg> = {};
        for (const arg of s.arguments) {
          if (arg.value.kind === 'Variable') {
            args[arg.name.value] = {
              value: variables[arg.value.name.value],
              type: arg.value,
              variableName: arg.value.name.value,
              variableDef: getVarDef(variableDefs, (arg.value as VariableNode).name.value)
            };
          } else if (arg.value.kind === 'NullValue') {
            args[arg.name.value] = {
              value: null,
              type: arg.value
            };
          } else {
            args[arg.name.value] = {
              value: (arg.value as any).value,
              type: arg.value
            };
          }
        }

        dest[cur] = { kind: 'func', parent: path, name: s.name.value, args };
      } else {
        dest[cur] = { kind: 'field', parent: path, name: s.name.value };
      }
      getSelections(s.selectionSet, cur, dest, variables, variableDefs);
    } else if (s.kind === 'FragmentSpread') {
      const k = `${path}#${s.name.value}`;
      dest[k] = { kind: 'fragment', parent: path, name: s.name.value };
    } else if (s.kind === 'InlineFragment') {
      dest[path] = { kind: 'inline-fragment', name: '', parent: path };
    }
  }

  return dest;
};

const getKey = (operation: Operation): string | undefined => {
  const defs = operation.query.definitions;
  const opDefs = getOpDefs(operation);

  if (opDefs.length !== 1) return;
  if (defs.some((a) => a.kind !== 'OperationDefinition' && a.kind !== 'FragmentDefinition')) return;
  if (opDefs[0].operation !== 'query') return;
  if (opDefs[0].selectionSet.selections.length !== 1) return;
  if (opDefs[0].selectionSet.selections[0].kind !== 'Field') return;

  return `${(opDefs[0].selectionSet.selections[0] as FieldNode).name.value}`;
};

const isEntryCompatible = (a: Entry, b: Entry) => {
  if (a.kind === 'inline-fragment' || b.kind === 'inline-fragment') return false;
  if (a.kind === 'fragment' || b.kind === 'fragment') return false;
  if (a.kind === 'field' && b.kind === 'field') return true;
  if (a.kind === 'func' && b.kind === 'func') {
    return isEqual(a.args, b.args);
  }
  return false;
};

const isCompatible = (a: Record<string, Entry>, b: Record<string, Entry>) => {
  return Object.entries(a).every(([k, v]) => !(k in b) || isEntryCompatible(v, b[k]));
};

const buildName = (n: string): NameNode => ({ kind: 'Name', value: n });

const buildSelectionSet = (g: [string, Entry][], parent: string): SelectionSetNode => {
  return {
    kind: 'SelectionSet',
    selections: g
      .filter(([, v]) => v.parent === parent)
      .map(([, v]) => {
        if (v.kind === 'field' || v.kind === 'func') {
          return {
            kind: 'Field',
            name: buildName(v.name),
            selectionSet: buildSelectionSet(g, `${parent}.${v.name}`),
            arguments:
              v.kind === 'func'
                ? Object.entries(v.args).map(([k1]) => ({
                    kind: 'Argument',
                    name: buildName(k1),
                    value: v.args[k1].type
                  }))
                : undefined
          };
        } else if (v.kind === 'fragment') {
          return { kind: 'FragmentSpread', name: buildName(v.name) };
        } else {
          throw new Error('inline-fragments not supported');
        }
      })
  };
};

const makeOperation = (
  group: Record<string, Entry>,
  fragments: FragmentDefinitionNode[],
  name: string,
  operation: Operation
): Operation => {
  const vdefs = Object.values(group)
    .flatMap((e) => (e.kind === 'func' ? Object.values(e.args) : []))
    .filter((a) => !!a.variableDef);
  const context = operation.getContext();
  return {
    variables: Object.fromEntries(vdefs.map((a) => [a.variableName, a.value])),
    operationName: name,
    extensions: {},
    query: {
      kind: 'Document',
      definitions: [
        {
          kind: 'OperationDefinition',
          operation: 'query',
          name: buildName(name),
          selectionSet: buildSelectionSet(Object.entries(group), ''),
          variableDefinitions: vdefs.map((a) => a.variableDef!)
        },
        ...fragments
      ]
    },
    setContext: (_context: Record<string, any>) => {
      Object.assign(context, _context);
      return context;
    },
    getContext: () => context
  };
};

const batchHandler: BatchHandler = (
  operations: Operation[],
  forward?: (NextLink | undefined)[]
) => {
  const key = getKey(operations[0]);
  if (key?.startsWith('unique-') || operations.length === 1) {
    return makeObservable<FetchResult>(
      operations.map((op, idx) => forward![idx]!(op)),
      operations,
      operations,
      operations.map((_a, idx) => [idx])
    );
  }

  // Get all selections
  const selections = operations.map((op) =>
    getSelections(
      getOpDefs(op)[0]!.selectionSet,
      '', // root
      {}, // start
      op.variables,
      getOpDefs(op)[0]!.variableDefinitions
    )
  );

  // Group into possible sets
  const groups: {
    entries: Record<string, Entry>;
    fragmentDefs: FragmentDefinitionNode[];
    indexes: number[];
  }[] = [];

  outer: for (let i = 0; i < selections.length; i++) {
    // Rename all fragments
    const fragments = getFragmentDefs(operations[i]).map(
      (f): FragmentDefinitionNode => ({
        ...f,
        name: buildName(`I${i}_${f.name.value}`)
      })
    );

    Object.values(selections[i])
      .filter((v) => v.kind === 'fragment')
      .forEach((v) => {
        v.name = `I${i}_${v.name}`;
      });

    for (const g of groups) {
      if (!isCompatible(selections[i], g.entries) || g.indexes.length >= MAX_GROUP_SIZE) continue;

      Object.assign(g.entries, selections[i]);
      g.fragmentDefs = [...(g.fragmentDefs ?? []), ...fragments];
      g.indexes.push(i);
      continue outer;
    }

    groups.push({ entries: selections[i], fragmentDefs: fragments, indexes: [i] });
  }

  const newOperations = groups.map((g, idx) =>
    makeOperation(g.entries, g.fragmentDefs, `MergedQuery${idx}`, operations[g.indexes[0]])
  );

  return makeObservable<FetchResult>(
    newOperations.map((op, idx) => forward![idx]!(op)),
    newOperations,
    operations,
    groups.map((g) => g.indexes)
  );
};

let unique = 0;
export const smartBatchLink = new BatchLink({
  batchHandler,
  batchKey: (operation) => getKey(operation) ?? `unique-${unique++}`
});
