/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { handleApolloError, State } from '@exo/frontend-common-apollo';

const transformResponse = <T>(data: any): T => {
  return data?.studioEntities;
};

export const useEntities = <T extends EntitySummary>({ }: Args): Result<T> => {
  const variables = { };

  const { called, loading, data, error } = useQuery(
    gql`
      { 
        studioEntities {
          name
          group
          type
        }
      }
    `,
    { variables }
  );

  handleApolloError(__filename, error);

  return { called, loading, data: transformResponse(data), error };
};

type Args = {
};

export type EntitySummary = {
  name: string;
  group: string;
  type: string;
}

type Result<T extends EntitySummary> = {
  data?: T[];
  called: boolean;
} & State;
