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
import { OverviewPage } from './OverviewPage';
import storeMock from '../../../mocks/stores-mock';

export default {
  title: 'Features/Marketplace/Admin/Pages/OverviewPage',
  component: OverviewPage,
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
    urlPath="/account-stores/overview"
  >
    <SessionContextProvider state={{ username: 'a', roles: ['user', 'customer'] }}>
      <OverviewPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// ----------------------------------------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={storeMock.stores()}
    urlPath="/account-stores/overview"
    mockState="loading"
  >
    <SessionContextProvider state={{ username: 'a', roles: ['user', 'customer'] }}>
      <OverviewPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {};

// ----------------------------------------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={storeMock.stores()}
    urlPath="/account-stores/overview"
    mockState="error"
  >
    <SessionContextProvider state={{ username: 'a', roles: ['user', 'customer'] }}>
      <OverviewPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {};

// ----------------------------------------------------------------------------------------------------
