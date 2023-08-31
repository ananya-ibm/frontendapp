/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme } from '@testUtils';
import PaymentForm from './PaymentForm';

jest.mock('@exo/frontend-common-session-context', () => ({
  useSessionContext: () => ({})
}));

jest.mock('@exo/frontend-features-automotive-cart-automotive-logic', () => ({
  useCart: jest.fn(() => ({
    data: {},
    loading: false,
    error: null
  })),
  useCheckout: jest.fn(() => ({
    updateShipping: jest.fn(),
    updateBilling: jest.fn(() => {
      return new Promise(resolve => {
        resolve('xxx');
      });
    }),
    checkout: jest.fn(() => {
      return new Promise(resolve => {
        resolve({ data: { checkout: 'xxx' } });
      });
    }),
    loading: false,
    error: null
  })),
  usePayment: jest.fn(() => ({
    initiatePayment: jest.fn(() => {
      return new Promise(resolve => {
        resolve({ data: { initiatePayment: 'xxx' } });
      });
    }),
    loading: false,
    error: null
  }))
}));

jest.mock('@stripe/react-stripe-js', () => ({
  useStripe: jest.fn(() => ({
    confirmCardPayment: jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          paymentIntent: {
            status: 'succeeded'
          }
        });
      });
    })
  })),
  CardElement: jest.fn(() => <div>Card Element</div>),
  useElements: jest.fn(() => ({
    getElement: jest.fn()
  }))
}));

const testProps = {
  onBackClick: jest.fn(),
  onNextClick: jest.fn()
};

window.scrollTo = jest.fn();

describe('<PaymentForm /> component', () => {
  test('its snapshot matches', async () => {
    const { container } = renderWithTheme(<PaymentForm {...testProps} />);
    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
