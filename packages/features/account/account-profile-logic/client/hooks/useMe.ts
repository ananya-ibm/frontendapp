/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { FetchPolicy, useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';
import { useSessionContext } from '@exo/frontend-common-session-context';

export const useMe = <T>({ skip, fetchPolicy }: Args, fragments: Fragments): Result<T> => {
  const sessionContext = useSessionContext();

  const variables = {
    // To force refresh at login/logout
    __token: sessionContext.token
  };

  const { called, loading, data, error, refetch } = useQuery(
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
      skip,
      ...(fetchPolicy ? { fetchPolicy } : { })
    }
  );

  handleApolloError(__filename, error);

  return { called, loading, data, refetch, error };
};

type Args = {
  skip?: boolean;
  fetchPolicy?: FetchPolicy;
};

type Result<T> = {
  data?: { id?: string; me: T };
  called?: boolean;

  refetch?: () => void;
} & State;
