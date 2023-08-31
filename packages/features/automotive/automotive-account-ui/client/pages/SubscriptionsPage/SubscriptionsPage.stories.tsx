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
import { SubscriptionsPage } from './SubscriptionsPage';
import App from '../../App';
import autoProfileMock from '../../../mocks/auto-profile';

export default {
  title: 'Features/Automotive/Account/Pages/SubscriptionsPage',
  component: SubscriptionsPage,
  decorators: [
    Story => {
      return (
        <div style={{ margin: '-1em' }}>
          <Story />
        </div>
      );
    }
  ]
};

export const Default = args => (
  <ContainerWrapper
    app={App}
    type="auto"
    mocks={autoProfileMock.me()}
    urlPath="/account-automotive/subscriptions"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <SubscriptionsPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// -----------------------------------------------------------------------
export const Loading = args => (
  <ContainerWrapper
    app={App}
    type="auto"
    mocks={autoProfileMock.me()}
    mockState="loading"
    urlPath="/account-automotive/subscriptions"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <SubscriptionsPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {
  ...Default.args
};

// -----------------------------------------------------------------------
export const Error = args => (
  <ContainerWrapper
    app={App}
    type="auto"
    mocks={autoProfileMock.me()}
    mockState="error"
    urlPath="/account-automotive/subscriptions"
  >
    <SubscriptionsPage {...args} />
  </ContainerWrapper>
);
Error.args = {
  ...Default.args
};

// -----------------------------------------------------------------------
