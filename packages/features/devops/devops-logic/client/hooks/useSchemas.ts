/*
 Licensed Materials - Property of IBM
 694906H
 (c) Copyright IBM Corp.  2020 All Rights Reserved

 US Government Users Restricted Rights - Use, duplication or disclosure restricted
 by GSA ADP Schedule Contract with IBM Corp.
 */

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';

const transformResponse = <T>(data: any): T => {
  return data?.opsSchemas?.edges?.map(e => e.node) ?? [];
};

export const useSchemas = <T>(selectedFacets: string[], fragments: Fragments): Result<T> => {
  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
         query OpsSchemas($facets: [String!]) {
           opsSchemas(facets: $facets) {
            facets {
              code
              name
              multiSelect
              type
              entries {
                label
                count
                code
                state
                type
              }        
            }
            edges {
              node {
                ${fragmentNames}
              }
            }
           }
         }
       `,
      fragments
    ),
    { variables: { facets: selectedFacets }}
  );

  handleApolloError(__filename, error);

  return { called, loading, data: transformResponse(data), facets: data?.opsSchemas?.facets, error };
};

export type Facet = {
  code: string;
  name: string;
  multiSelect?: boolean;
  type: string;
  entries: FacetEntry[];
};

type FacetEntry = {
  label: string;
  count?: number;
  code: string;
  state?: string;
  type?: 'select' | 'range';
};


type Result<T> = {
  data?: T;
  facets?: Facet[];
  called: boolean;
} & State;
