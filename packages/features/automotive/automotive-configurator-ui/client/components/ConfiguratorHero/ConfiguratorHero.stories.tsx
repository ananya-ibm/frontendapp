/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { Route } from 'react-router';
import { ConfiguratorContextProvider } from '@exo/frontend-features-automotive-configurator-logic';
import { EventContextProvider } from '@exo/frontend-features-events-logic';
import { ConfiguratorHero } from './ConfiguratorHero';
import autoCatalogMocks from '../../../mocks/auto-catalog';

export default {
  title: 'Features/Automotive/Configurator/Smart Components/Configuration/ConfiguratorHero',
  component: ConfiguratorHero
};

export const Default = args => (
  <SmartComponentWrapper mocks={autoCatalogMocks.configuredItem()} urlPath="/cfg/123">
    <EventContextProvider configuration={{} as any}>
      <ConfiguratorContextProvider>
        <Route path="/cfg/:configurationId" component={() => <ConfiguratorHero {...args} />} />
      </ConfiguratorContextProvider>
    </EventContextProvider>
  </SmartComponentWrapper>
);
Default.args = {};

// -------------------------------------------------------------------

export const Loading = args => (
  <SmartComponentWrapper
    mocks={autoCatalogMocks.configuredItem()}
    urlPath="/cfg/123"
    mockState="loading"
  >
    <Route path="/cfg/:configurationId" component={() => <ConfiguratorHero {...args} />} />
  </SmartComponentWrapper>
);
Loading.args = {};

// -------------------------------------------------------------------

export const Error = args => (
  <SmartComponentWrapper
    mocks={autoCatalogMocks.configuredItem()}
    urlPath="/cfg/123"
    mockState="error"
  >
    <Route path="/cfg/:configurationId" component={() => <ConfiguratorHero {...args} />} />
  </SmartComponentWrapper>
);
Error.args = {};
