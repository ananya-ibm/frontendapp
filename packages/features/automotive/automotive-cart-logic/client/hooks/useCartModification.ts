/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const ADD_TO_CART = gql`
  mutation AddToCart($lineItems: [CrtLineItemInput!]!, $cartId: ID) {
    cartAdd(cartId: $cartId, lineItems: $lineItems) {
      id
      lineItems {
        id
        quantity
      }
    }
  }
`;

const UPDATE_CART = gql`
  mutation UpdateCart($lineItems: [CrtLineItemForUpdateInput]!, $cartId: ID) {
    cartUpdate(cartId: $cartId, lineItems: $lineItems) {
      id
      lineItems {
        id
        quantity
      }
    }
  }
`;

const UPDATE_CART_ID = gql`
  mutation UpdateCart($cartId: ID!, $lineItems: [CrtLineItemForUpdateInput]!) {
    cartUpdate(cartId: $cartId, lineItems: $lineItems) {
      id
      lineItems {
        id
        quantity
      }
    }
  }
`;

const UPDATE_SHIPPING_INFO = gql`
  mutation CartUpdateShippingInfo($storeId: ID, $addressId: ID, $shipModeId: ID) {
    cartSetShippingInfo(
      cartId: -1
      storeId: $storeId
      addressId: $addressId
      shipModeId: $shipModeId
      lineItemIds: []
    )
  }
`;

const UPDATE_PAYMENT_METHOD = gql`
  mutation CartUpdatePaymentMethod(
    $addressId: ID
    $id: ID!
    $paymentMethodId: ID
    $attributes: [CrtPaymentAttributeInput]
  ) {
    cartAddPaymentInstruction(
      cartId: $id
      addressId: $addressId
      paymentMethodId: $paymentMethodId
      attributes: $attributes
    )
  }
`;

const CLEAR_PAYMENT_METHODS = gql`
  mutation CartClearPaymentMethods($id: ID!) {
    cartDeletePaymentInstructions(cartId: $id)
  }
`;

const CHECKOUT = gql`
  mutation Checkout($id: ID!) {
    checkout(cartId: $id)
  }
`;

const CREATE_CONFIGURED_ITEM = gql`
  mutation createConfiguredItem($partnumber: String!, $currency: String) {
    configuredItemCreate(currency: $currency, input: { partnumber: $partnumber }) {
      id
      cartId
    }
  }
`;

export const useCartModification = () => {
  const session = useSessionContext();

  const updateQty = key => d => {
    const newCartCount = d[key].lineItems.map(li => li.quantity).reduce((a, b) => a + b, 0);
    session.set({ cartCount: newCartCount });
  };

  const [cartAdd] = useMutation(ADD_TO_CART, {
    onCompleted: updateQty('cartAdd')
  });
  const [cartUpdate] = useMutation(UPDATE_CART, {
    onCompleted: updateQty('cartUpdate')
  });
  const [cartUpdateId] = useMutation(UPDATE_CART_ID, {
    onCompleted: updateQty('cartUpdate')
  });
  const [cartSetShippingInfo] = useMutation(UPDATE_SHIPPING_INFO);
  const [cartUpdatePaymentMethod] = useMutation(UPDATE_PAYMENT_METHOD);
  const [cartDeletePaymentMethods] = useMutation(CLEAR_PAYMENT_METHODS);
  const [cartCheckout] = useMutation(CHECKOUT);
  const [cartCreateConfig] = useMutation(CREATE_CONFIGURED_ITEM);

  return {
    add: async items => {
      await session.get();
      return cartAdd({ variables: { cartId: session.cartId, lineItems: items } });
    },

    update: async items => {
      await session.get();
      return cartUpdate({ variables: { cartId: session.cartId, lineItems: items } });
    },

    updateId: async ({ cartId, items }) => {
      await session.get();
      return cartUpdateId({ variables: { cartId, lineItems: items } });
    },

    setShippingMode: async (shipModeId, addressId, storeId) => {
      return cartSetShippingInfo({
        variables: { storeId, addressId, shipModeId }
      });
    },

    setPaymentMethod: async (addressId, paymentMethodId, attributes) => {
      await cartDeletePaymentMethods({ variables: { id: -1 } });
      return cartUpdatePaymentMethod({
        variables: {
          addressId,
          id: -1,
          paymentMethodId,
          attributes: attributes || []
        }
      });
    },

    checkout: async () => {
      return cartCheckout({ variables: { id: -1 } });
    },

    createConfig: async baseProductId => {
      return cartCreateConfig({
        variables: {
          partnumber: baseProductId,
          cartId: session.cartId,
          currency: session.currency
        }
      });
    }
  };
};
