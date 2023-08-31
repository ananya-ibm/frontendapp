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
import App from '../../App';
import { OrdersPage } from './OrdersPage';

export default {
  title: 'Features/Marketplace/Admin/Pages/OrdersPage',
  component: OrdersPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper type="b2b" app={App} mocks={{}} urlPath="/account-stores/orders">
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <OrdersPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// -----------------------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={{}}
    urlPath="/account-stores/orders"
    mockState="loading"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <OrdersPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {};

// -----------------------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={{}}
    urlPath="/account-stores/orders"
    mockState="error"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <OrdersPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {};

// -----------------------------------------------------------------------------------
