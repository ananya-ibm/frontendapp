/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const DELETE_CART = gql`
  mutation DELETE_CART($cartId: ID!) {
    cartDelete(cartId: $cartId)
  }
`;

const GET_CARTS = gql`
  query CARTS($cartId: ID) {
    me {
      id
      carts(cartId: $cartId) {
        id
        grandTotal {
          currency
          value
        }
        totalSalesTax {
          value
          currency
        }
        lineItems {
          product {
            name
            id
            description
            longDescription
            thumbnail
            price {
              list {
                value
                currency
              }
              offer {
                value
                currency
              }
            }
            parentCategory {
              name
              id
              parentCategory {
                name
                id
              }
            }
          }
        }
      }
    }
  }
`;

const CART_ADD = gql`
  mutation CART_ADD($cartId: ID, $lineItems: [CrtLineItemInput!]!) {
    cartAdd(cartId: $cartId, lineItems: $lineItems) {
      id
    }
  }
`;

export const useCarts = () => {
  const session = useSessionContext();

  const { data, error, loading } = useQuery(GET_CARTS, { variables: { cartId: session.cartId } });

  const [cartDelete] = useMutation(DELETE_CART, {
    variables: { cartId: session && session.cartId },
    onCompleted: () => session.set({ ...session, cartId: undefined })
  });

  const [addToCart] = useMutation(CART_ADD, {
    onCompleted: ({ cartAdd }) => cartAdd && session.set({ ...session, cartId: cartAdd.id }),
    // eslint-disable-next-line no-console
    onError: err => console.log('addToCart Error: ', err)
  });

  return {
    getCarts: () => ({ data, error, loading }),
    deleteCart: () => cartDelete(),
    addToCart: lineItems => {
      const variables: any = { lineItems };
      if (session.cartId) variables.cartId = session.cartId;
      return addToCart({ variables });
    }
  };
};
