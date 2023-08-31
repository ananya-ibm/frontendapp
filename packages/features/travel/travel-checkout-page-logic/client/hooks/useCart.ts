/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const GQL_ADD = gql`
  mutation CartAdd($lineItems: [CrtLineItemInput!]!, $cartId: ID) {
    cartAdd(lineItems: $lineItems, cartId: $cartId) {
      id
      shippingInfo {
        shippingAddress {
          address1
        }
      }
    }
  }
`;

const GQL_UPDATE = gql`
  mutation CartUpdate($cartSetShippingInfoCartId2: ID!, $addressId: ID) {
    cartSetShippingInfo(cartId: $cartSetShippingInfoCartId2, addressId: $addressId)
  }
`;

const GQL_CHECKOUT = gql`
  mutation Checkout($cartId: ID!) {
    checkout(cartId: $cartId)
  }
`;

export const useCart = () => {
  const session = useSessionContext();
  const [gqlAdd] = useMutation(GQL_ADD);
  const [gqlUpdate] = useMutation(GQL_UPDATE);
  const [gqlCheckout] = useMutation(GQL_CHECKOUT);

  return {
    add: async (cartId, items) => {
      await session.get();

      const effectiveItems = [...(Array.isArray(items) ? items : [items])];

      return gqlAdd({ variables: { cartId, lineItems: effectiveItems } });
    },
    update: async (cartId, addressId) => {
      return gqlUpdate({ variables: { cartSetShippingInfoCartId2: cartId, addressId } });
    },
    checkout: cartId => {
      return gqlCheckout({ variables: { cartId } });
    }
  };
};