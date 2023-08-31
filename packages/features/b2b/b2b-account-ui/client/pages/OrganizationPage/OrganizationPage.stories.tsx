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
import { Route } from 'react-router';
import { OrganizationPage } from './OrganizationPage';
import App from '../../App';
import b2bAccountMocks from '../../../mocks/b2b-account';

export default {
  title: 'Features/B2B/Account/Pages/Organization',
  component: OrganizationPage,
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
    mocks={b2bAccountMocks.all()}
    urlPath="/my-company/my-organization/123"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer', 'b2badmin'] }}>
      <Route
        path="/my-company/my-organization/:id"
        component={() => <OrganizationPage {...args} />}
      />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {
  id: '1'
};

// --------------------------------------------------------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={b2bAccountMocks.all()}
    urlPath="/my-company/my-organization/123"
    mockState="loading"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer', 'b2badmin'] }}>
      <Route
        path="/my-company/my-organization/:id"
        component={() => <OrganizationPage {...args} />}
      />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {
  ...Default.args
};

// --------------------------------------------------------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={b2bAccountMocks.all()}
    urlPath="/my-company/my-organization/123"
    mockState="error"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer', 'b2badmin'] }}>
      <Route
        path="/my-company/my-organization/:id"
        component={() => <OrganizationPage {...args} />}
      />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {
  ...Default.args
};

// --------------------------------------------------------------------------------------------------------------------
