/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { InternalSchema } from '../types';

/* eslint-disable no-else-return */

export const getFormControls = (schema: InternalSchema) => {
  const isNavigable =
    schema.fields.length === 1 &&
    schema.fields[0].type === 'panel-group' &&
    schema.fields[0].presentation?.view === 'wizard';
  const navigationLength = schema.fields[0].fields?.length ?? 0;

  if (isNavigable) {
    return {
      canSubmit: ({ isDirty, isValid }, { idx }) =>
        idx === navigationLength - 1 && isDirty && isValid,
      hasNext: (_: unknown, { idx }) => idx < navigationLength - 1,
      hasPrevious: (_: unknown, { idx }) => idx > 0,
      next: (_: unknown, s: any) => ({ ...s, idx: s.idx + 1 }),
      previous: (_: unknown, s: any) => ({ ...s, idx: s.idx - 1 })
    };
  } else {
    return {
      canSubmit: ({ isDirty, isValid }) => isDirty && isValid,
      hasNext: () => false,
      hasPrevious: () => false,
      next: () => {},
      previous: () => {}
    };
  }
};

export const getFormState = (_schema: InternalSchema) => {
  return {
    idx: 0
  };
};
