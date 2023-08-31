/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Entity } from '../hooks/useEntity';


type Attribute = Entity['attributes'][0];

const attributes = (attrs: Attribute[]) => {
  let q = '';
  attrs.forEach(a => {
    if (a.scalarType) {
      q += a.name + '\n'
    } else if (a.subEntity) {
      q += `${a.name} { ` + attributes(a.subEntity.attributes) + '}\n'
    } else if (a.relationTo) {
      q += `${a.name} { ${a.relationTo.idField} }\n`;
    }
  })
  return q;
}

export const buildListQuery = (entity: Entity) => {
  console.assert(entity.list);

  let q = '';
  q += `query ${entity.list!.queryName} {`;
  q += entity.list!.queryName + ' { ';
  q += attributes(entity.attributes)
  q += '}';

  q += '}';

  return q;
}

export const buildReadQuery = (entity: Entity) => {
  console.assert(entity.read);

  let q = '';
  q += `query ${entity.read!.queryName}($id: ID!) {`;
  q += `${entity.read!.queryName}(${entity.read!.id.name}: $id) { `;
  q += attributes(entity.attributes)
  q += '}';
  q += '}';

  return q;
}

export const buildCreateQuery = (entity: Entity) => {
  console.assert(entity.create);

  let q = '';
  q += `mutation ${entity.create!.mutationName}($data: ${entity.create!.input.type}!) {`;
  q += `${entity.create!.mutationName}(${entity.create!.input.name}: $data) { `;
  q += attributes(entity.attributes)
  q += '}';
  q += '}';

  return q;
}

export const buildUpdateQuery = (entity: Entity) => {
  console.assert(entity.update);

  let q = '';
  q += `mutation ${entity.update!.mutationName}($data: ${entity.update!.input.type}!, $id: ID!) {`;
  q += `${entity.update!.mutationName}(${entity.update!.id.name}: $id, ${entity.update!.input.name}: $data) { `;
  q += attributes(entity.attributes)
  q += '}';
  q += '}';

  return q;
}

export const buildDeleteQuery = (entity: Entity) => {
  console.assert(entity.delete);

  let q = '';
  q += `mutation ${entity.delete!.mutationName}($id: ID!) {`;
  q += `${entity.delete!.mutationName}(${entity.delete!.id.name}: $id)`;
  q += '}';

  return q;
}

