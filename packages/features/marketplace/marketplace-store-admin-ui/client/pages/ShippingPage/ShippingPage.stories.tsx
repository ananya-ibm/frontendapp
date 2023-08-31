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
import { ShippingPage } from './ShippingPage';
import storeMock from '../../../mocks/stores-mock';

export default {
  title: 'Features/Marketplace/Admin/Pages/ShippingPage',
  component: ShippingPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={storeMock.stores()}
    urlPath="/account-stores/shipping"
  >
    <SessionContextProvider state={{ username: 'a', roles: ['user', 'customer'] }}>
      <ShippingPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// -------------------------------------------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={storeMock.stores()}
    urlPath="/account-stores/shipping"
    mockState="loading"
  >
    <SessionContextProvider state={{ username: 'a', roles: ['user', 'customer'] }}>
      <ShippingPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {};

// -------------------------------------------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={storeMock.stores()}
    urlPath="/account-stores/shipping"
    mockState="error"
  >
    <SessionContextProvider state={{ username: 'a', roles: ['user', 'customer'] }}>
      <ShippingPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {};

// -------------------------------------------------------------------------------------------------------
