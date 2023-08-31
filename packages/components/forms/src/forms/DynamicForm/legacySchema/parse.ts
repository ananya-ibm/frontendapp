/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { InternalSchema } from '../types';

/* eslint-disable no-else-return */

const transformValidation = v => {
  if (v.type === 'required') {
    return { type: 'required', message: v.params[0] };
  } else {
    // eslint-disable-next-line no-console
    console.log(`Unknown validation type ${v.type}`);
    return undefined;
  }
};

const transformElement = (_baseId, e) => {
  const f = {
    id: e.id,
    label: e.label,
    validations: (e.validations ?? []).map(transformValidation).filter(v => v)
  };
  if (e.type === 'text' || e.type === 'date') {
    return {
      ...f,
      type: 'input',
      presentation: {
        placeholder: e.placeholder
      }
    };
  } else if (e.type === 'longtext') {
    return {
      ...f,
      type: 'textarea',
      presentation: {
        placeholder: e.placeholder
      }
    };
  } else if (e.type === 'dropdown') {
    return {
      ...f,
      type: 'select',
      presentation: {
        placeholder: e.placeholder
      },
      options: e.options.map(o => ({ value: o, label: o }))
    };
  } else if (e.type === 'number') {
    return {
      ...f,
      type: 'input',
      presentation: {
        placeholder: e.placeholder
      },
      validations: [{ type: 'number' }, ...e.validations.map(transformValidation).filter(v => v)]
    };
  } else {
    return undefined;
  }
};

const transformStep = step => {
  return {
    type: 'group',
    id: step.name,
    label: step.name,
    fields: step.blocks.map(b => ({
      id: `${step.name}_${b.name}`,
      label: b.name,
      helpText: b.description,
      type: 'group',
      fields: b.elements.map(e => transformElement(`${step.name}_${b.name}`, e)).filter(e => e)
    }))
  };
};

export const parse = (f: any): InternalSchema => {
  if (f.stages.length > 1) throw new Error('Only single stage forms are supported');

  const steps = f.stages[0].steps.map(s => transformStep(s));

  if (steps.length === 1) {
    return { fields: steps[0].fields };
  } else {
    return {
      fields: [
        {
          id: 'root',
          type: 'panel-group',
          presentation: {
            view: 'wizard'
          },
          fields: steps
        }
      ]
    };
  }
};
