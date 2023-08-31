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
import CashPayment from './CashPayment';
import autoCartMocks from '../../../mocks/auto-cart';

export default {
  title: 'Features/Automotive/Cart/Smart Components/CashPayment',
  component: CashPayment
};

export const Default = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <CashPayment {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Default.args = {
  priceBreakdown: [
    {
      text: 'Option 1',
      amount: {
        value: 456,
        currency: 'EUR'
      }
    },
    {
      text: 'Option 2',
      amount: {
        value: 789,
        currency: 'EUR'
      }
    }
  ]
};
