/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { DynamicFormDefinition, DynamicFormFieldList } from '@exo/frontend-components-forms';
import { Entity } from '@exo/frontend-features-studio-logic';
import startCase from 'lodash/startCase'

type Attribute = Entity['attributes'][0];

const buildFieldList = (attributes: Attribute[], prefix = ''): DynamicFormFieldList => {
  return attributes.map((a) => {
    const res: any = {
      type: 'input',
      id: `${prefix}${a.name}`,
      label: startCase(a.name),
      validations: []
    };

    if (a.isMandatory) {
      res.validations.push({
        type: 'required',
        message: `${a.name} is required`
      });
    }

    if (a.subEntity) {
      if (a.isList) {
        res.type = 'array';
        res.presentation = {
          view: a.subEntity.attributes.length > 3 ? 'list' : 'table',
          numberOfItems: 1
        };
        res.fields = buildFieldList(a.subEntity.attributes, `${prefix}${a.name}[].`);
      } else {
        res.type = 'group';
        res.presentation = {
          view: 'group'
        };
        res.fields = buildFieldList(a.subEntity.attributes, `${prefix}${a.name}.`);
      }
    } else if (a.isList) {
      res.type = 'array';
      res.presentation = {
        view: 'table',
        numberOfItems: 1
      };

      if (a.scalarType) {
        res.fields = [
          {
            type: 'input',
            id: `${prefix}${a.name}[]`,
            label: 'Value'
          }
        ];
      } else {
        res.fields = [
          {
            type: 'input',
            id: `${prefix}${a.name}[].${a.relationTo.idField}`,
            label: startCase(a.relationTo.idField),
            validations: [{ type: 'required', message: `${a.relationTo.idField} is required` }]
          }
        ];
      }
    }

    return res;
  });
};

export const buildFormFromEntity = (entity: Entity): DynamicFormDefinition => {
  return {
    fields: buildFieldList(entity.attributes.filter((f) => f.scalarType !== 'ID'))
  };
};
