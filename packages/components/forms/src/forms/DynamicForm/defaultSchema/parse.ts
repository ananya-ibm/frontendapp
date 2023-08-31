/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { DefaultSchema } from './types';
import { Field, InternalSchema } from '../types';

const generateIds = (f: { fields?: Field[] }, prefix?: string[]) => {
  (f.fields ?? []).forEach((field, idx) => {
    if (!field.id) {
      // eslint-disable-next-line no-param-reassign
      field.id = [...(prefix ?? []), `__${idx}`].join('.');
    }

    if (field.type === 'array' || field.type === 'list') {
      generateIds(field, [...(prefix ?? []), `${field.id}[]`]);
    } else {
      generateIds(field, prefix);
    }
  });
};

export const parse = (f: DefaultSchema): InternalSchema => {
  generateIds(f);
  return f;
};
