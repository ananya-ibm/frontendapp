/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';

export const useOrganization = <T>({ id }: Args, fragments: Fragments): Result<T> => {
  const variables = {
    id
  };
  const { called, loading, data, error, refetch } = useQuery(
    assembleQuery(
      fragmentNames => `
        query Organization($id: ID!) {
          organization(id: $id) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    {
      variables
    }
  );

  handleApolloError(__filename, error);

  return { called, loading, data, refetch, error };
};

type Args = {
  id: string;
};

type Result<T> = { data?: { organization?: T }; refetch: any; called?: boolean } & State;
