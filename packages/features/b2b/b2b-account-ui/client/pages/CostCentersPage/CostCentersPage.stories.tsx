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
import { CostCentersPage } from './CostCentersPage';
import App from '../../App';

export default {
  title: 'Features/B2B/Account/Pages/CostCenters',
  component: CostCentersPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper type="b2b" app={App} mocks={{}} urlPath="/my-company/cost-centers">
    <SessionContextProvider state={{ roles: ['user', 'customer', 'b2badmin'] }}>
      <CostCentersPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {};

// --------------------------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={{}}
    urlPath="/my-company/cost-centers"
    mockState="loading"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer', 'b2badmin'] }}>
      <CostCentersPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = {};

// --------------------------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    type="b2b"
    app={App}
    mocks={{}}
    urlPath="/my-company/cost-centers"
    mockState="error"
  >
    <SessionContextProvider state={{ roles: ['user', 'customer', 'b2badmin'] }}>
      <CostCentersPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = {};

// --------------------------------------------------------------------------------------
