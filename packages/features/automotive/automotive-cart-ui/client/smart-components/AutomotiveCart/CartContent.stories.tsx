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
import CartContent from './CartContent';
import autoCartMocks from '../../../mocks/auto-cart';

export default {
  title: 'Features/Automotive/Cart/Smart Components/CartContent',
  component: CartContent
};

export const Default = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <CartContent {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Default.args = {
  financeSelector: {
    isOpen: false,
    hasFinance: false,
    selectorOption: 'lorem'
  }
};

// ------------------------------------------------------------------------

export const Loading = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()} mockState="loading">
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <CartContent {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Loading.args = {
  financeSelector: {
    isOpen: false,
    hasFinance: false,
    selectorOption: 'lorem'
  }
};

// ------------------------------------------------------------------------

export const Error = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()} mockState="error">
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <CartContent {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Error.args = {
  financeSelector: {
    isOpen: false,
    hasFinance: false,
    selectorOption: 'lorem'
  }
};

// ------------------------------------------------------------------------
