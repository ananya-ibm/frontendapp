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
import App from '../App';
import FinancePage from './FinancePage';
import autoCartMocks from '../../mocks/auto-cart';

export default {
  title: 'Features/Automotive/Cart/Containers/FinancePage',
  component: FinancePage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper type="auto" app={App} mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <FinancePage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// ---------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper type="auto" app={App} mocks={autoCartMocks.cart()} mockState="loading">
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <FinancePage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {};

// ---------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper type="auto" app={App} mocks={autoCartMocks.cart()} mockState="error">
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <FinancePage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {};
