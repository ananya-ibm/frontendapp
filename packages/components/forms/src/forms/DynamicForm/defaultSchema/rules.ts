/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import { resolveRef, setData, makeIndexedId } from './idUtils';
import { Field, Rule } from '../types';

export const evalRuleExpression = (prop, operator, operand) => {
  if (operator === 'eq') {
    // eslint-disable-next-line eqeqeq
    return prop == operand;
  } else if (operator === 'gt') {
    return prop > operand;
  } else if (operator === 'lt') {
    return prop < operand;
  } else if (operator === 'gte') {
    return prop >= operand;
  } else if (operator === 'lte') {
    return prop <= operand;
  } else if (operator === 'neq') {
    // eslint-disable-next-line eqeqeq
    return prop != operand;
  } else if (operator === 'in') {
    return operand.includes(prop);
  } else if (operator === 'not_in') {
    return !operand.includes(prop);
  } else {
    throw new Error(`Unsupported operator ${operator}`);
  }
};

export const checkRule = (opts, f: Field, rule: Rule) => {
  const { watch, schema } = opts;
  const r = makeIndexedId(resolveRef(f.id!.split('.'), rule.ref), opts.indexes);

  let prop = true;
  if (rule.property === 'valid') {
    const obj = setData({}, r, watch(r));
    try {
      schema.validateSyncAt(r, obj, { abortEarly: false });
    } catch (e) {
      prop = false;
    }
  } else if (rule.property === 'value') {
    prop = watch(r);
  } else {
    throw new Error(`Unsupported rule property ${rule.property}`);
  }

  return evalRuleExpression(prop, rule.operator, rule.operand);
};
