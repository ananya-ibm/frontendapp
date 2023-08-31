/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import {
  assembleQuery,
  Fragments,
  handleApolloError,
  QueryResponse
} from '@exo/frontend-common-apollo';

// TODO: We should move this to catalog-logic and check overlap with useAvailability
export const useCartAvailability = <T>(
  { skuIds, storeIds, zip, country }: Args,
  fragments: Fragments
): Result<T> => {
  const filter: any = {};
  if (zip) {
    filter.zipCode = zip;
  }
  if (country) {
    filter.country = country;
  }

  const variables: any = { ids: skuIds ?? [], storeIds: storeIds ?? [] };

  if (filter.country || filter.zipCode) {
    variables.filter = filter;
  }

  const { loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
        query Availability($ids: [ID!]!, $storeIds: [ID!], $filter: AvFilter) {
          availability(partnumbers: $ids, shipNodeIds: $storeIds, filter: $filter) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    {
      skip:
        variables.ids.length <= 0 ||
        (variables.storeIds.length === 0 && variables.filter === undefined),
      variables
    }
  );

  handleApolloError(__filename, error);

  return { loading, data, error };
};

type Args = {
  skuIds?: string[];
  storeIds?: string[];
  zip?: string;
  country?: string;
};

type Result<T> = QueryResponse<{ availability?: T[] }>;
