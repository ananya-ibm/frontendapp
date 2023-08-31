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
import { AddressesPage } from './AddressesPage';
import b2cProfileMock from '../../../mocks/b2c-profile';

export default {
  title: 'Features/Account/Profile/Pages/AddressesPage',
  component: AddressesPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper app={App} mocks={b2cProfileMock.me()} urlPath="/account-profile/addresses">
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <AddressesPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// ------------------------------------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cProfileMock.me()}
    urlPath="/account-profile/addresses"
    mockState="loading"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <AddressesPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {};

// ------------------------------------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cProfileMock.me()}
    urlPath="/account-profile/addresses"
    mockState="error"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <AddressesPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {};

// ------------------------------------------------------------------------------------------------
