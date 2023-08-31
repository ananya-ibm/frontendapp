/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';

const UPDATE_SHIPPING_INFO = gql`
  mutation CartSetShippingInfo($cartId: ID!, $address: CusAddressInput!) {
    cartSetShippingInfo(cartId: $cartId, address: $address)
  }
`;

const UPDATE_BILLING_INFO = gql`
  mutation CartSetBillingInfo($cartId: ID!, $address: CusAddressInput!, $paymentMethodId: ID!) {
    cartAddPaymentInstruction(cartId: $cartId, address: $address, paymentMethodId: $paymentMethodId)
  }
`;

const PLACE_ORDER = gql`
  mutation($cartId: ID!) {
    checkout(cartId: $cartId)
  }
`;

export const useCheckout = () => {
  const [updateShippingInfo, { loading, error }] = useMutation(UPDATE_SHIPPING_INFO);

  if (error) {
    // eslint-disable-next-line no-console
    console.log('shipping error:', error);
  }

  const [updateBillingInfo, { loading: billLoading, error: billError }] = useMutation(
    UPDATE_BILLING_INFO
  );

  if (billError) {
    // eslint-disable-next-line no-console
    console.log('billing error:', billError);
  }

  const [placeOrder, { loading: checkoutLoading, error: checkoutError }] = useMutation(PLACE_ORDER);

  if (checkoutError) {
    // eslint-disable-next-line no-console
    console.log('error placing order:', billError);
  }

  return {
    updateShipping: async (cartId, address) =>
      updateShippingInfo({
        variables: { cartId, address }
      }),
    updateBilling: async (cartId, address, paymentMethodId = "cc") =>
      updateBillingInfo({
        variables: { cartId, address, paymentMethodId }
      }),
    checkout: async cartId =>
      placeOrder({
        variables: { cartId }
      }),
    loading,
    error,
    billLoading,
    billError,
    checkoutLoading,
    checkoutError
  };
};
