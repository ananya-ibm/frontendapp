/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { FetchPolicy, useQuery } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';

const canHaveCart = (type?: string, token?: string) => type !== 'NONE' && token;

// TODO: We should get rid of sessionContext here
export const useCart = <T>({ cartId, skip, fetchPolicy }: Args, fragments: Fragments): Result<T> => {
  const sessionContext = useSessionContext();

  // TODO: We shouldn't default to -1 here
  const variables = {
    id: cartId ?? -1,

    // To force refresh at login/logout
    __token: `${sessionContext.token} ${sessionContext.cartId}`
  };

  const { loading, data, error, refetch } = useQuery(
    assembleQuery(
      fragmentNames => `
        query CartById($id: ID) {
          me {
            id
            carts(cartId: $id) {
              ${fragmentNames}
            }
          }
        }
      `,
      fragments
    ),
    {
      variables,
      skip: skip || !canHaveCart(sessionContext.type, sessionContext.token),
      ...(fetchPolicy ? { fetchPolicy } : {})
    }
  );

  handleApolloError(__filename, error);

  return { loading, refetch, error, data };
};

type Args = {
  cartId: string;
  skip?: boolean;
  fetchPolicy?: FetchPolicy;
};

type Result<T> = { data?: { me: { carts: T[] } }; refetch: any } & State;
