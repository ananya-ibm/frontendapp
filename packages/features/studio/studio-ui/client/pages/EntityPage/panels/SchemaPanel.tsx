/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Entity, EntityContainer } from '@exo/frontend-features-studio-logic';
import { CrudView } from '../../../components/CrudView/CrudView';

type Attribute = Pick<
  Entity['attributes'][0],
  | 'name'
  | 'isList'
  | 'isMandatory'
  | 'isSynthetic'
  | 'scalarType'
  | 'type'
  | 'validValues'
  | 'relationTo'
  | 'subEntity'
>;

type AttributeAndPath = Attribute & { path: string };

const flattenAttributes = (attributes: Attribute[], prefix = ''): AttributeAndPath[] => {
  const res: AttributeAndPath[] = [];
  for (const a of attributes) {
    const newPrefix = prefix + a.name + (a.isList ? '[]' : '');
    if (!!a.subEntity) {
      flattenAttributes(a.subEntity.attributes, newPrefix + '.').forEach((at) => res.push(at));
    } else {
      res.push({
        ...a,
        path: newPrefix,
        subEntity: undefined
      });
    }
  }
  return res;
};

export const SchemaPanel = ({ entity }: Props) => {
  const columns = [
    { label: 'Path', id: 'path', defaultInclude: true },
    {
      label: 'Type',
      id: (a) => {
        if (a.relationTo) {
          if (a.isRelayStyleConnection) return `>> ${a.relationTo.typeName}`;
          return `> ${a.relationTo.typeName}`;
        }
        return a.scalarType;
      },
      defaultInclude: true
    },
    { label: 'Mandatory', id: (a) => (a.isMandatory ? 'Yes' : ''), defaultInclude: true },
    { label: 'Overridable', id: 'canOverride', defaultInclude: true },
    { label: 'Localizable', id: 'canLocalize', defaultInclude: true }
  ];

  return (
    <EntityContainer
      type={entity}
      render={(props) => (
        <CrudView columns={columns} data={flattenAttributes(props.entity.attributes)} {...props} />
      )}
    />
  );
};

type Props = {
  entity: string;
};
