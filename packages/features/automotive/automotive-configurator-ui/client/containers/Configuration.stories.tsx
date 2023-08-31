/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { Route } from 'react-router';
import { Configuration } from './Configuration';
import App from '../App';
import autoCatalogMocks from '../../mocks/auto-catalog';

export default {
  title: 'Features/Automotive/Configurator/Containers/Configuration',
  component: Configuration,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper type="auto" app={App} mocks={autoCatalogMocks.all()} urlPath="/cfg/123">
    <Route path="/cfg/:configurationId" component={() => <Configuration {...args} />} />
  </ContainerWrapper>
);
Default.args = {};

// -----------------------------------------------------------------------
export const Loading = args => (
  <ContainerWrapper
    type="auto"
    app={App}
    mocks={autoCatalogMocks.all()}
    mockState="loading"
    urlPath="/cfg/123"
  >
    <Route path="/cfg/:configurationId" component={() => <Configuration {...args} />} />
  </ContainerWrapper>
);
Loading.args = {};

// -----------------------------------------------------------------------
export const Error = args => (
  <ContainerWrapper
    type="auto"
    app={App}
    mocks={autoCatalogMocks.all()}
    mockState="error"
    urlPath="/cfg/123"
  >
    <Route path="/cfg/:configurationId" component={() => <Configuration {...args} />} />
  </ContainerWrapper>
);
Error.args = {};

// -----------------------------------------------------------------------
