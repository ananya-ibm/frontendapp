/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';
import { useSessionContext } from '@exo/frontend-common-session-context';

export const useOrderHistory = <T>(_: unknown, fragments: Fragments): Result<T> => {
  const sessionContext = useSessionContext();

  const variables = {
    // To force refresh at login/logout
    __token: sessionContext.token
  };

  const { called, loading, data, error, fetchMore } = useQuery(
    assembleQuery(
      fragmentNames => `
        query Me {
          me {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    {
      variables,
      fetchPolicy: 'network-only'
    }
  );

  handleApolloError(__filename, error);

  return { called, loading, fetchMore, data, error };
};

type Result<T> = {
  data?: { me: T };
  called?: boolean;

  fetchMore?: (args: any) => void;
} & State;
