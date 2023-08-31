/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useApolloClient } from '@apollo/client';
import { handleApolloError, State } from '@exo/frontend-common-apollo';
import { useEffect, useState } from 'react';
import { buildListQuery } from '../utils/queryBuilder';
import { Entity } from './useEntity';
import { PageInfo, RelayVariables } from './useRelay';

export type OrderBy = {
  id: string;
  direction?: 'ASCENDING' | 'DESCENDING';
};

export const useListData = (
  entity?: Entity,
  search?: string,
  relayControls?: RelayVariables,
  sort?: OrderBy
): Result<any[]> => {
  const apolloClient = useApolloClient();

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(undefined);
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    if (!entity) return;

    if (!entity.list) {
      const query = apolloClient.watchQuery({
        query: gql`
          query ArchiveEntries(
            $entity: String!
            $search: String
            $before: String
            $after: String
            $first: Int
            $last: Int
            $orderBy: StudioOrderBy
          ) {
            studioArchiveEntries(
              entity: $entity
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
                cursor
                node {
                  id
                  lastUpdated
                  payload
                }
              }
            }
          }
        `,
        variables: {
          entity: entity.name,
          search,
          orderBy: sort,
          ...relayControls
        }
      });

      const mapData = (dt: any) =>
        dt.studioArchiveEntries.edges.map((e) => ({
          lastUpdated: e.node.lastUpdated,
          ...e.node.payload
        }));
      query.result().then(
        (v) => {
          setData(mapData(v.data));
          setPageInfo(v.data.studioArchiveEntries.pageInfo);
          setLoading(false);
        },
        (e) => {
          setError(e);
          setLoading(false);
        }
      );

      const subscription = query.subscribe((result) => {
        setData(mapData(result.data));
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      const query = apolloClient.watchQuery({
        query: gql`
          ${buildListQuery(entity)}
        `
      });

      const mapData = (dt: any) => dt[entity?.list?.queryName!];
      query.result().then(
        (v) => {
          setData(mapData(v.data));
          setPageInfo(undefined);
          setLoading(false);
        },
        (e) => {
          setError(e);
          setLoading(false);
        }
      );

      const subscription = query.subscribe((result) => {
        setData(mapData(result.data));
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [
    entity,
    search,
    relayControls?.first,
    relayControls?.after,
    relayControls?.after,
    relayControls?.before,
    sort?.id,
    sort?.direction
  ]);

  handleApolloError(__filename, error);

  return { loading, entity: entity!, data, error, pageInfo };
};

type Result<T> = {
  data?: T;
  pageInfo?: PageInfo;
  entity: Entity;
} & State;
