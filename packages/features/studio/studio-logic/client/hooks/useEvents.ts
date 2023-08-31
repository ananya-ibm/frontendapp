/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { handleApolloError, State } from '@exo/frontend-common-apollo';
import { PageInfo, RelayVariables } from './useRelay';

export const useEvents = (
  search?: string,
  relayControls?: RelayVariables,
  sort?: OrderBy
): Result<any[]> => {
  const { loading, data, error } = useQuery(
    gql`
      query StudioEventArchiveEntries (
          $search: String
          $before: String
          $after: String
          $first: Int
          $last: Int
          $orderBy: StudioEventArchiveOrderBy
        ) {
        studioEventArchiveEntries(
          query: $search
          before: $before
          after: $after
          first: $first
          last: $last
          orderBy: $orderBy
        ) {
          pageInfo {
            totalResultsCount
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              lastUpdated
              payload
            }
          }
        }
      }
    `,
    {
      variables: {
        search,
        orderBy: sort,
        ...relayControls
      }
    }
  );

  handleApolloError(__filename, error);

  return { loading, 
    data: data?.studioEventArchiveEntries?.edges?.map(e => e.node) ?? [], 
    error, 
    pageInfo: data?.studioEventArchiveEntries?.pageInfo
  };
};

// TODO: This is used in multiple places
export type OrderBy = {
  id: string;
  direction?: 'ASCENDING' | 'DESCENDING';
};

type Result<T> = {
  data?: T;
  pageInfo?: PageInfo;
} & State;
