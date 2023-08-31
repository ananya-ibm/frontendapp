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
import Finance from './Finance';
import autoCartMocks from '../../../mocks/auto-cart';

export default {
  title: 'Features/Automotive/Cart/Smart Components/Finance',
  component: Finance
};

// PERSONAL_CONTRACT_PURCHASE

export const Default = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <Finance {...args} />
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
  ],
  financeSelector: {
    financeOption: '',
    hasFinance: true,
    isOpen: false
  }
};

// -------------------------------------------------------------------------------

export const Open = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <Finance {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Open.args = {
  ...Default.args,
  financeSelector: {
    financeOption: '',
    hasFinance: true,
    isOpen: true
  }
};

// -------------------------------------------------------------------------------

export const WithPCP = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <Finance {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
WithPCP.args = {
  ...Default.args,
  financeSelector: {
    financeOption: 'PERSONAL_CONTRACT_PURCHASE',
    hasFinance: true,
    isOpen: false
  }
};

// -------------------------------------------------------------------------------
