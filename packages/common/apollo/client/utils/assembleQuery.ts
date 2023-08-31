/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { DocumentNode, gql } from '@apollo/client';
import { FragmentDefinitionNode } from 'graphql';

export type Fragments = DocumentNode | DocumentNode[];

export const assembleQuery = (queryFn: (names: string[]) => string, fragments: Fragments) => {
  const fragmentArray = (Array.isArray(fragments) ? fragments : [fragments]).filter(f => f);
  const fragmentNames = fragmentArray.map(
    f => `...${(f.definitions[0] as FragmentDefinitionNode).name.value}\n`
  );

  const q = queryFn(fragmentNames);
  return gql([q, ...fragmentArray?.map(() => '')], ...fragmentArray);
};

export const assembleMultiQuery = (
  queryFn: (names: Record<string, string[]>) => string,
  fragmentMap: Record<string, DocumentNode[]>
) => {
  const fragmentArray = Object.values(fragmentMap).flatMap(v => v);
  const fragmentNames = Object.fromEntries(
    Object.entries(fragmentMap).map(([k, v]) => [
      k,
      v.map(f => `...${(f.definitions[0] as FragmentDefinitionNode).name.value}\n`)
    ])
  );
  const q = queryFn(fragmentNames);
  return gql([q, ...fragmentArray?.map(() => '')], ...fragmentArray);
};
