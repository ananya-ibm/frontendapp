/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useApolloClient } from '@apollo/client';
import { handleApolloError } from '@exo/frontend-common-apollo';
import { buildCreateQuery, buildDeleteQuery, buildReadQuery, buildUpdateQuery } from '../utils/queryBuilder';
import { Entity } from './useEntity';

const transformResponse = <T>(data: any, root: string): T => {
  return data?.[root];
};

export const useCRUD = (entity?: Entity): Result<any> => {
  const apolloClient = useApolloClient();

  const onCreate = (d: any) => {
    return apolloClient.mutate({
      mutation: gql`${buildCreateQuery(entity!)}`,
      variables: { data: d },
      refetchQueries: [entity?.list?.queryName!, entity?.read?.queryName!]
    })
  };

  const onDelete = (idToDelete: string) => {
    return apolloClient.mutate({
      mutation: gql`${buildDeleteQuery(entity!)}`,
      variables: { id: idToDelete },
      refetchQueries: [entity?.list?.queryName!]
    })
  };

  const onGet = async (idToGet: string): Promise<any> => {
    const query = await apolloClient.query({
      query: gql`${buildReadQuery(entity!)}`,
      variables: { id: idToGet }
    });
    if (query.error) handleApolloError(__filename, query.error);
    return transformResponse(query.data, entity?.read?.queryName ?? '');
  }

  const onUpdate = (updateId: string, d: any) => {
    return apolloClient.mutate({
      mutation: gql`${buildUpdateQuery(entity!)}`,
      variables: { data: d, id: updateId },
      refetchQueries: [entity?.list?.queryName!, entity?.read?.queryName!]
    })
  };

  return { 
    onDelete,
    onCreate,
    onGet,
    onUpdate
  };
};

type Result<T> = {
  onGet: (id: string) => Promise<T>;
  onCreate: (data: T) => Promise<any>;
  onUpdate: (id: string, data: T) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
};
