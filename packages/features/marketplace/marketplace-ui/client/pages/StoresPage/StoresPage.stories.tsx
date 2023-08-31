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
import { StoresPage } from './StoresPage';
import mocks from '../../../mocks/stores-mock';

export default {
  title: 'Features/Marketplace/Store/Pages/StoresPage',
  component: StoresPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper type="b2b" app={App} mocks={mocks.stores()} urlPath="/marketplace/stores">
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <StoresPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// -----------------------------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={mocks.stores()}
    urlPath="/marketplace/stores"
    mockState="loading"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <StoresPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {};

// -----------------------------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={mocks.stores()}
    urlPath="/marketplace/stores"
    mockState="error"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <StoresPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {};

// -----------------------------------------------------------------------------------------
