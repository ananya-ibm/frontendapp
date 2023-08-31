/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// TODO: Replace by regular useCart
import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';
import { useSessionContext } from '@exo/frontend-common-session-context';

const canHaveCart = (type?: string, token?: string) => type !== 'NONE' && token;

export const useCart = <T>({ cartId, skip }: Args, fragments: Fragments): Result<T> => {
  const sessionContext = useSessionContext();

  const variables = {
    cartId: cartId ?? sessionContext.cartId,

    // To force refresh at login/logout
    __token: `${sessionContext.token} ${sessionContext.cartId}`
  };

  const { loading, data, error, refetch } = useQuery(
    assembleQuery(
      fragmentNames => `
        query AutoCartById($cartId: ID) {
          me {
            id
            carts(cartId: $cartId) {
              ${fragmentNames}
            }
          }
        }
      `,
      fragments
    ),
    {
      variables,
      skip: skip || !canHaveCart(sessionContext.type, sessionContext.token)
    }
  );

  handleApolloError(__filename, error);

  return { loading, refetch, error, data };
};

type Args = {
  cartId?: string;
  skip?: boolean;
};

type Result<T> = { data?: { me: { carts: T[] } }; refetch: any } & State;
