/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type Selection = {
  id: string;
  criteria: {
    criteriaId: string;
    sequence?: string;
    name: string;
    value: Value;
  }[];
};

type Value = {
  id: string;
  value: string;
  sequence?: string;
  available?: boolean;
};

const comparator = <T>(
  seqFn: (arg: T) => string | number | undefined,
  strFn: (arg: T) => string
) => (a: T, b: T): number => {
  const d = Number(seqFn(a) ?? 0) - Number(seqFn(b) ?? 0);
  return d === 0 ? strFn(a).localeCompare(strFn(b)) : d;
};

export const uniq = <T>(arr: T[]): T[] => [...new Set(arr)];

export const undefinedToNull = <T>(a?: T): T | null => (a === undefined ? null : a);

export const evaluateSelectionCriteria = (
  activeSelection: Record<string, string>,
  selection: Selection[],
  fallbackActiveSelection: Record<string, string> = {}
) => {
  let newActiveSelection = activeSelection;
  const filterSelection = (selected: Selection[], active: Record<string, string>) =>
    selected.filter(s =>
      Object.entries(active).every(
        ([ci, cv]) => !cv || s.criteria.find(c => c.criteriaId === ci)?.value.id === cv
      )
    );

  const valueMap = (selected: Selection[]) => {
    const criteria: Record<
      string,
      {
        id: string;
        name: string;
        sequence?: string;
        valueMap?: Record<string, Value>;
        values: Value[];
      }
    > = {};
    for (const s of selected) {
      s.criteria.forEach(c => {
        criteria[c.criteriaId] = criteria[c.criteriaId] ?? {
          id: c.criteriaId,
          name: c.name,
          sequence: c.sequence,
          values: [],
          valueMap: {}
        };
        criteria[c.criteriaId].valueMap![c.value.id] = c.value;
      });
    }
    return criteria;
  };

  // Determine possible matching skus
  let skus = filterSelection(selection, newActiveSelection).map(s => s.id);
  if (skus.length === 0) {
    newActiveSelection = fallbackActiveSelection;
    skus = filterSelection(selection, fallbackActiveSelection).map(s => s.id);
  }

  // Determine sorted list of criteria ids
  const criteriaIds = uniq(
    selection
      .flatMap(s => s.criteria.map(c => ({ id: c.criteriaId, seq: c.sequence })))
      .sort(
        comparator(
          k => k.seq,
          k => k.id
        )
      )
      .map(c => c.id)
  );

  // Build complete set of criteria and possible values
  const criteria = valueMap(selection);

  // Sort values
  for (const [, cv] of Object.entries(criteria)) {
    cv.values = Object.values(cv.valueMap!).sort(
      comparator(
        k => k.sequence,
        k => k.value
      )
    );
  }

  // Tag values that are not valid under current combination
  // For each criteria, look at selection in other criteria and deduce which attributes are not valid
  for (const criteriaId of criteriaIds) {
    const activeSelectionInOtherCriterias = Object.assign({}, newActiveSelection, {
      [criteriaId]: undefined
    });
    const values = valueMap(filterSelection(selection, activeSelectionInOtherCriterias));
    criteria[criteriaId].values = criteria[criteriaId].values.map(v => ({
      ...v,
      available: !!values[criteriaId].valueMap![v.id]
    }));
    delete criteria[criteriaId].valueMap;
  }

  return {
    skus,
    activeSelection: newActiveSelection,
    criteria: criteriaIds.map(c => criteria[c]).filter(c => c.values.length > 1)
  };
};
