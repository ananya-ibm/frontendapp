/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import autoCartMocks from '../../../mocks/auto-cart';

const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

export default {
  title: 'Features/Automotive/Cart/Smart Components/PaymentForm',
  component: PaymentForm
};

export const Default = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <Elements stripe={stripePromise}>
        <PaymentForm {...args} />
      </Elements>
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Default.args = {
  stripeOptions: {
    style: {
      base: {
        fontFamily: "'IBM Plex Sans', Arial, sans-serif",
        fontSmoothing: 'antialiased',
        fontSize: '1rem',
        '::placeholder': {
          color: '#000'
        }
      },
      invalid: {
        color: '#da1e28',
        iconColor: '#da1e28'
      }
    }
  }
};
