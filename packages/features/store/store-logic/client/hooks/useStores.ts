/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';

export const useStores = <T>(
  { country, longitude, latitude }: Args,
  fragments: Fragments
): Result<T> => {
  const variables = {
    filter: {
      country,
      longitude,
      latitude
    }
  };

  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
        query Store($filter: StStoreFilter!) {
          stores(filter: $filter) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    {
      variables,
      skip: !country
    }
  );

  handleApolloError(__filename, error);

  return { called, loading, data };
};

type Args = {
  country?: string;
  longitude?: string;
  latitude?: string;
};

type Result<T> = {
  data?: { stores: T[] };
  called: boolean;
} & State;
