/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useProfileModification } from '@exo/frontend-features-account-profile-logic';
import { Address, cleanAddress } from '../model/address';

export const GQL_SET_SHIPPING_INFO = gql`
  mutation CartSetShippingInfo(
    $address: CusAddressInput
    $addressId: ID
    $cartId: ID!
    $shipModeId: ID
    $storeId: ID
  ) {
    cartSetShippingInfo(
      address: $address
      addressId: $addressId
      cartId: $cartId
      shipModeId: $shipModeId
      storeId: $storeId
      lineItemIds: []
    )
  }
`;

const GQL_ADD_PAYMENT_METHOD = gql`
  mutation CartUpdatePaymentMethod(
    $addressId: ID
    $cartId: ID!
    $address: CusAddressInput
    $paymentMethodId: ID!
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
  mutation Checkout($cartId: ID!) {
    checkout(cartId: $cartId)
  }
`;

const GQL_GET_CART = gql`
  query CartById($id: ID) {
    me {
      id
      carts(cartId: $id) {
        id
        grandTotal {
          ...Currency
        }
        totalProductPrice {
          ...Currency
        }
        totalShippingCharge {
          ...Currency
        }
        totalAdjustment {
          ...Currency
        }
        totalShippingTax {
          ...Currency
        }
        totalSalesTax {
          ...Currency
        }
        adjustments {
          title
          amount {
            ...Currency
          }
        }
        shippingInfo {
          shipMode {
            id
            identifier
          }
          pickupInStore {
            id
            name
          }
          shippingAddress {
            id
            country
            zip
          }
        }
        lineItems {
          id
          quantity
          partnumber
          linePrice {
            ...Currency
          }
          unitPrice {
            ...Currency
          }
          product {
            id
            type
            thumbnail
            name
            partnumber
            price {
              list {
                ...Currency
              }
              offer {
                ...Currency
              }
            }
          }
        }
      }
    }
  }

  fragment Currency on CmmMoney {
    value
    currency
  }
`;

// TODO: There's some opportunity to reduce duplication as some of this is handled in useCartModification
export const useCheckout = () => {
  const apolloClient = useApolloClient();
  const session = useSessionContext();
  const { addAddress, updateAddress } = useProfileModification();

  const [gqlAddPaymentMethod] = useMutation(GQL_ADD_PAYMENT_METHOD);
  const [gqlDeletePaymentMethods] = useMutation(GQL_DELETE_PAYMENT_METHODS);
  const [gqlCheckout] = useMutation(GQL_CHECKOUT);
  const [gqlSetShippingInfo] = useMutation(GQL_SET_SHIPPING_INFO);

  const cartId = session?.cartId;

  return {
    saveShippingInfo: async (props: {
      shipModeId?: string;
      address?: Address;
      addressId?: string;
      storeId?: string;
    }) => {
      console.assert(props.address || props.addressId);

      const variables: any = { cartId };
      if (props.addressId) variables.addressId = props.addressId;
      if (props.storeId) variables.storeId = props.storeId;
      if (props.shipModeId) variables.shipModeId = props.shipModeId;
      if (props.address) variables.address = cleanAddress(props.address);

      await gqlSetShippingInfo({ variables });
    },

    saveToAddressBook: async (address: Address) => {
      console.assert(session.type === 'USER');

      const addressClean = cleanAddress(address);
      const addressId = address.id;

      if (!addressId) {
        const res = await addAddress({
          ...addressClean,
          name: `${addressClean.firstName} ${addressClean.lastName}`
        });
        return res.data.customerAddAddress;
      } else {
        const res = await updateAddress(address.id!, addressClean);
        return res.data.customerUpdateAddress;
      }
    },

    savePaymentInfo: async (props: {
      addressId?: string;
      address?: Address;
      paymentMethodId: string;
      attributes?: { name: string; value: string }[];
    }) => {
      await gqlDeletePaymentMethods({ variables: { cartId } });

      const variables: any = {
        cartId,
        paymentMethodId: props.paymentMethodId,
        attributes: props.attributes ?? []              
      };

      if (props.address) variables.address = cleanAddress(props.address);
      if (props.addressId) variables.addressId = props.addressId;

      return gqlAddPaymentMethod({ variables });
    },

    getCartForSummary: async (id = '-1') => {
      return apolloClient.query({
        query: GQL_GET_CART,
        fetchPolicy: 'network-only',
        variables: { id }
      });
    },

    placeOrder: async (id = '-1') => gqlCheckout({ variables: { cartId: id } })
  };
};
