/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import * as yup from 'yup';
import { AnySchemaConstructor, ObjectSchema, Schema } from 'yup';
import { resolveRef } from './idUtils';
import { evalRuleExpression } from './rules';
import { Field, InternalSchema, ValidationFunction, ValidationSchemaOpts } from '../types';

const VALIDATIONS: Record<string, ValidationFunction> = {
  number: () => yup.number(),
  required: (y, opts, _base, o) =>
    (y ?? yup.string()).required(opts.intl.msg(o.message_code!, o.message!)),
  'same-as': (y, opts, base, o) =>
    (y ?? yup.string()).oneOf(
      [yup.ref(resolveRef(base, o.ref)), null],
      opts.intl.msg(o.message_code!, o.message!)
    ),
  email: (y, opts, _base, o) =>
    (y ?? yup.string()).email(opts.intl.msg(o.message_code!, o.message!)),
  url: (y, opts, _base, o) => (y ?? yup.string()).url(opts.intl.msg(o.message_code!, o.message!)),
  minLength: (y, opts, _base, o) =>
    (y ?? yup.string()).min(o.value, opts.intl.msg(o.message_code!, o.message!)),
  maxLength: (y, opts, _base, o) =>
    (y ?? yup.string()).max(o.value, opts.intl.msg(o.message_code!, o.message!)),
  min: (y, opts, _base, o) =>
    (y ?? yup.number()).min(o.value, opts.intl.msg(o.message_code!, o.message!)),
  max: (y, opts, _base, o) =>
    (y ?? yup.number()).max(o.value, opts.intl.msg(o.message_code!, o.message!)),
  matches: (y, opts, _base, o) =>
    (y ?? yup.string()).matches(o.value, opts.intl.msg(o.message_code!, o.message!))
};

const createYupSchema = (p: FieldTree, base: string[], opts: ValidationSchemaOpts) => {
  return yup.object().shape(
    Object.fromEntries(
      Object.entries(p).map(([k, v]) => {
        if (v instanceof Array) {
          return [
            k,
            yup
              .array<any>()
              // Ignore empty rows when validating
              .compact(obj =>
                Object.values(obj).every(s => s === '' || s === null || s === undefined)
              )
              .of(createYupSchema(v[0], [...base, k], opts))
          ];
          // eslint-disable-next-line no-underscore-dangle
        } else if (v.__type === 'field') {
          let val: undefined | Schema<any, any> | AnySchemaConstructor;
          for (const o of v?.validations ?? []) {
            // @ts-ignore
            const y = o.enabled ? yup[val?.type ?? 'string']() : val;

            const validation = (opts.customValidationRules[o.type] ?? VALIDATIONS[o.type])(
              y,
              opts,
              base,
              o
            );

            if (o.enabled) {
              val = y.when(resolveRef(base, o.enabled.ref), {
                is: fv => evalRuleExpression(fv, o.enabled!.operator, o.enabled!.operand),
                then: validation
              });
            } else {
              val = validation;
            }
          }

          return [k, val];
        } else {
          return [k, createYupSchema(v as any, [...base, k], opts)];
        }
      })
    )
  );
};

export const getValidationSchema = (
  schema: InternalSchema,
  opts: ValidationSchemaOpts
): ObjectSchema => {
  const getAllFields = (s: { fields?: Field[] }): Field[] => {
    return (
      s.fields?.flatMap(f =>
        f.type === 'group' || f.type === 'panel-group' || f.type === 'array' ? getAllFields(f) : f
      ) ?? []
    );
  };

  const obj: FieldTree = {};
  for (const e of getAllFields(schema)) {
    const f = e.id!;
    // eslint-disable-next-line array-callback-return, consistent-return
    f.split('.').reduce((acc, c, idx, arr) => {
      if (c.endsWith('[]')) {
        const n = c.split('[')[0];
        acc[n] = acc[n] ?? [{}];
        return acc[n][0];
      } else if (idx === arr.length - 1) {
        acc[c] = { __type: 'field', ...e };
      } else {
        acc[c] = acc[c] ?? {};
        return acc[c];
      }
    }, obj);
  }

  return createYupSchema(obj, [], opts);
};

type ExtendedField = Field & { __type?: string };
type FieldTree = Record<string, FieldTree[] | ExtendedField>;
