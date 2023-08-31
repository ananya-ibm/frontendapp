/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApolloError, useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';
import { ProductRef } from '@exo/frontend-features-catalog-logic';

ApolloError

export const useStoresWithAvailability = <T>(
  { productId, storeIds, zip, country }: Args,
  fragments: Fragments
): Result<T> => {
  const filter = {
    zipCode: zip,
    country
  };

  // TODO: It's a bit confusing that we send in the slug here and not partnumber
  const variables = {
    ids: [productId.ref],
    storeIds: storeIds ?? [],
    filter: Object.values(filter).filter(a => !!a).length > 0 ? filter : undefined
  };

  const { called, loading, data, error, fetchMore } = useQuery(
    assembleQuery(
      fragmentNames => `
        query Availability($ids: [ID], $storeIds: [ID!], $filter: AvFilter) {
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

  return { called, loading, fetchMore, data, error };
};

type Args = {
  productId: ProductRef;
  storeIds?: string[];
  zip?: string;
  country?: string;
};

type Result<T> = {
  data?: { availability: T };
  fetchMore: (args: any) => void;
  called: boolean;
} & State;
