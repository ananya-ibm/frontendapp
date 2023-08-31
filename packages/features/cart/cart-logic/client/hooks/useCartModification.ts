/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const REFETCH_LINE_ITEMS = gql`
  fragment useCartModificationRefetchLineItems on CrtCart {
    id
    lineItems {
      id
      quantity
      partnumber
      linePrice {
        currency
        value
      }
    }
  }
`;

const REFETCH_PRICES = gql`
  fragment useCartModificationRefetchPrices on CrtCart {
    id
    grandTotal {
      value
      currency
    }
    totalProductPrice {
      value
      currency
    }
    totalShippingCharge {
      value
      currency
    }
    totalAdjustment {
      value
      currency
    }
    totalShippingTax {
      value
      currency
    }
    totalSalesTax {
      value
      currency
    }
    adjustments {
      title
      amount {
        currency
        value
      }
    }
  }
`;

const REFETCH_DELIVERY_OPTIONS = gql`
  fragment useCartModificationRefetchDeliveryOptions on CrtCart {
    id
    availableShippingModes {
      id
      identifier
      description
      type
      shippingRate {
        value
        currency
      }
    }
    shippingInfo {
      shipMode {
        id
      }
      pickupInStore {
        id
        name
      }
    }
  }
`;

const GQL_ADD = gql`
  mutation AddToCart($lineItems: [CrtLineItemInput!]!, $cartId: ID) {
    cartAdd(cartId: $cartId, lineItems: $lineItems) {
      id
      ...useCartModificationRefetchLineItems
      ...useCartModificationRefetchDeliveryOptions
      ...useCartModificationRefetchPrices
    }
  }

  ${REFETCH_LINE_ITEMS}
  ${REFETCH_DELIVERY_OPTIONS}
  ${REFETCH_PRICES}
`;

const GQL_UPDATE = gql`
  mutation UpdateCart($lineItems: [CrtLineItemForUpdateInput!]!, $cartId: ID!) {
    cartUpdate(cartId: $cartId, lineItems: $lineItems) {
      id
      ...useCartModificationRefetchLineItems
      ...useCartModificationRefetchDeliveryOptions
      ...useCartModificationRefetchPrices
    }
  }

  ${REFETCH_LINE_ITEMS}
  ${REFETCH_DELIVERY_OPTIONS}
  ${REFETCH_PRICES}
`;

const GQL_SET_SHIPPING_MODE = gql`
  mutation CartUpdateShippingInfo($storeId: ID, $addressId: ID, $shipModeId: ID, $cartId: ID!) {
    cartSetShippingInfo(
      cartId: $cartId
      storeId: $storeId
      addressId: $addressId
      shipModeId: $shipModeId
      lineItemIds: []
    )
  }
`;

const GQL_UPDATE_PAYMENT_METHOD = gql`
  mutation CartUpdatePaymentMethod(
    $addressId: ID
    $cartId: ID!
    $address: CusAddressInput
    $paymentMethodId: ID
    $attributes: [CrtPaymentAttributeInput]
  ) {
    cartAddPaymentInstruction(
      cartId: $cartId
      addressId: $addressId
      address: $address
      paymentMethodId: $paymentMethodId
      attributes: $attributes
    )
  }
`;

const GQL_DELETE_PAYMENT_METHODS = gql`
  mutation CartClearPaymentMethods($cartId: ID!) {
    cartDeletePaymentInstructions(cartId: $cartId)
  }
`;

const GQL_CHECKOUT = gql`
  mutation Checkout($id: ID!) {
    checkout(cartId: $id)
  }
`;

export const GQL_UPDATE_SHIPPING_ADDRESS = gql`
  mutation CartSetShippingInfo(
    $cartId: ID!
    $addressId: ID
    $address: CusAddressInput
    $shipModeId: ID
  ) {
    cartSetShippingInfo(
      cartId: $cartId
      addressId: $addressId
      address: $address
      shipModeId: $shipModeId
    )
  }
`;

export const GQL_UPDATE_BILLING_ADDRESS = gql`
  mutation CartSetBillingInfo($cartId: ID!, $address: CusAddressInput) {
    cartAddPaymentInstruction(cartId: $cartId, address: $address)
  }
`;

const GQL_CREATE_CART = gql`
  mutation CreateCart($oldCartId: ID, $currency: String) {
    cartCreate(oldCartId: $oldCartId, currency: $currency) {
      id
    }
  }
`;

export const GQL_GET_SKU = gql`
  query CartGetSku($id: String) {
    product(id: $id) {
      id
      type
      children {
        id
        type
      }
    }
  }
`;
type GetSkuResponse = {
  data?: {
    product?: {
      id: string;
      type: string;
      children?: {
        id: string;
        type: string;
      };
    };
  };
};

const refresh = (id: string) => ({
  refetchQueries: [
    {
      query: gql`
        query CartById_Refetch($id: ID) {
          me {
            id
            carts(cartId: $id) {
              id
              ...useCartModificationRefetchLineItems
              ...useCartModificationRefetchDeliveryOptions
              ...useCartModificationRefetchPrices
            }
          }
        }
        ${REFETCH_LINE_ITEMS}
        ${REFETCH_DELIVERY_OPTIONS}
        ${REFETCH_PRICES}
      `,
      variables: { id }
    }
  ]
});

export const useCartModification = (props?: Props) => {
  const apolloClient = useApolloClient();
  const session = useSessionContext();
  let cartId = session?.cartId;

  const updateQty = (key: string) => d => {
    const newCartCount = d[key].lineItems.map(li => li.quantity).reduce((a, b) => a + b, 0);
    session.set({ cartCount: newCartCount, cartId: d[key].id });
  };

  const [gqlAdd] = useMutation(GQL_ADD, { onCompleted: updateQty('cartAdd') });
  const [gqlUpdate] = useMutation(GQL_UPDATE, { onCompleted: updateQty('cartUpdate') });
  const [gqlSetShippingMode] = useMutation(GQL_SET_SHIPPING_MODE, refresh(cartId!));
  const [gqlUpdatePaymentMethod] = useMutation(GQL_UPDATE_PAYMENT_METHOD, refresh(cartId!));
  const [gqlDeletePaymentMethods] = useMutation(GQL_DELETE_PAYMENT_METHODS, refresh(cartId!));
  const [gqlCheckout] = useMutation(GQL_CHECKOUT);
  const [gqlUpdateShippingAddress] = useMutation(GQL_UPDATE_SHIPPING_ADDRESS, refresh(cartId!));
  const [gqlUpdateBillingAddress] = useMutation(GQL_UPDATE_BILLING_ADDRESS, refresh(cartId!));
  const [gqlCreateCart] = useMutation(GQL_CREATE_CART);

  return {
    add: async (items, currency?: string) => {
      await session.get();

      if (!session.cartId) {
        const res = await gqlCreateCart({ variables: { currency } });
        cartId = res?.data?.cartCreate?.id;
      }

      const effectiveItems = [...(Array.isArray(items) ? items : [items])];
      if (props?.guessSkus) {
        if (items.length > 1)
          throw new Error('SKU resolution for addToCart only implemented for individual items');
        const skuResponse = (await apolloClient.query({
          query: GQL_GET_SKU,
          variables: { id: items[0].id }
        })) as GetSkuResponse;

        if (skuResponse.data?.product?.type === 'product') {
          effectiveItems[0].id = skuResponse.data?.product?.children?.[0]?.id;
          delete effectiveItems[0].partnumber;
        }
      }

      return gqlAdd({ variables: { cartId, lineItems: effectiveItems } });
    },

    update: async (items) => {
      return gqlUpdate({ variables: { lineItems: items, cartId } });
    },

    setShippingMode: async (shipModeId, addressId, storeId) => {
      return gqlSetShippingMode({ variables: { storeId, addressId, shipModeId, cartId } });
    },

    updateShippingAddress: async (address, shipModeId?) =>
      gqlUpdateShippingAddress({
        variables: {
          cartId,
          address: Object.fromEntries(
            Object.entries(address).filter(([key]) => key !== 'id')
          ),
          addressId: address?.id,
          shipModeId
        }
      }),

    updateBillingAddress: async (address) => {
      await gqlDeletePaymentMethods({ variables: { cartId } });
      gqlUpdateBillingAddress({ variables: { cartId, address } });
    },

    setPaymentMethod: async (addressId, address, paymentMethodId, attributes) => {
      await gqlDeletePaymentMethods({ variables: { cartId } });
      return gqlUpdatePaymentMethod({
        variables: {
          addressId,
          address,
          cartId,
          paymentMethodId,
          attributes: attributes ?? []
        }
      });
    },

    checkout: async (id: string) => gqlCheckout({ variables: { id: id || -1 } }),

    createCart: async ({ oldCartId, currency }: { oldCartId?: string; currency?: string }) => {
      const res = await gqlCreateCart({
        variables: { oldCartId, currency }
      });
      return res?.data?.cartCreate?.id;
    }
  };
};

type Props = { guessSkus?: boolean };
