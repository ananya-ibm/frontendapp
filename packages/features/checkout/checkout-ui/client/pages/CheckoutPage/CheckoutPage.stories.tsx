/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import { CheckoutContextProvider } from '@exo/frontend-features-checkout-logic';
import App from '../../App';
import { CheckoutPage } from './CheckoutPage';
import b2cCartMocks from '../../../../../cart/cart-ui/mocks/b2c-cart';

export default {
  title: 'Features/Checkout/Pages/CheckoutPage',
  component: CheckoutPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

type Props = React.ComponentProps<typeof CheckoutPage>;

export const Step1ShippingAddress = args => (
  <ContainerWrapper config={{}} app={App} mocks={b2cCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CheckoutContextProvider
        initialState="shipping"
        config={{ separateDeliveryScreen: true }}
        initialContext={{ initialized: true, loading: false }}
      >
        <CheckoutPage {...args} />
      </CheckoutContextProvider>
    </SessionContextProvider>
  </ContainerWrapper>
);
Step1ShippingAddress.args = {
  config: {
    feature: {
      addressBook: 'personal',
      addressSearch: undefined
    }
  }
} as Props;

// --------------------------------------------------------------------------------------------------------

export const Step1ShippingAddressWithAddressSearch = args => (
  <ContainerWrapper config={{}} app={App} mocks={b2cCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CheckoutContextProvider
        initialState="shipping"
        config={{ separateDeliveryScreen: true }}
        initialContext={{ initialized: true, loading: false }}
      >
        <CheckoutPage {...args} />
      </CheckoutContextProvider>
    </SessionContextProvider>
  </ContainerWrapper>
);
Step1ShippingAddressWithAddressSearch.args = {
  config: {
    feature: {
      addressBook: 'personal',
      separateDeliveryScreen: false,
      addressSearch: {
        // eslint-disable-next-line no-unused-vars
        search: async () => [
          {
            name: 'Street 1, London',
            value: { address1: 'Street 1', city: 'London', country: 'UK' }
          },
          {
            name: 'Dark Alley 4, New York',
            value: {
              address1: 'Dark Alley 4',
              city: 'New York',
              country: 'US',
              province: 'New York'
            }
          }
        ],
        lookup: async id => id
      }
    }
  }
} as Props;

// --------------------------------------------------------------------------------------------------------

export const Step2BillingAddress = args => (
  <ContainerWrapper config={{}} app={App} mocks={b2cCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CheckoutContextProvider
        initialState="billing"
        config={{ separateDeliveryScreen: true }}
        initialContext={{ initialized: true, loading: false, useBillingAddress: true }}
      >
        <CheckoutPage {...args} />
      </CheckoutContextProvider>
    </SessionContextProvider>
  </ContainerWrapper>
);
Step2BillingAddress.args = {
  ...Step1ShippingAddress.args
} as Props;

// --------------------------------------------------------------------------------------------------------
export const Step3Payment = args => (
  <ContainerWrapper config={{}} app={App} mocks={b2cCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CheckoutContextProvider
        initialState="payment"
        config={{ separateDeliveryScreen: true }}
        initialContext={{ initialized: true, loading: false }}
      >
        <CheckoutPage {...args} />
      </CheckoutContextProvider>
    </SessionContextProvider>
  </ContainerWrapper>
);
Step3Payment.args = {
  ...Step1ShippingAddress.args
} as Props;

// --------------------------------------------------------------------------------------------------------
export const Loading = args => (
  <ContainerWrapper config={{}} app={App} mocks={b2cCartMocks.cart()} mockState="loading">
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CheckoutContextProvider initialContext={{ initialized: true, loading: false }} config={{ separateDeliveryScreen: true }}>
        <CheckoutPage {...args} />
      </CheckoutContextProvider>
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {
  ...Step1ShippingAddress.args
} as Props;
