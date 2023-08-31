/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { ConfiguratorEntryBar } from './ConfiguratorEntryBar';
import autoCatalogMocks from '../../../mocks/auto-catalog';

export default {
  title: 'Features/Automotive/Configurator/Smart Components/Product/ConfiguratorEntryBar',
  component: ConfiguratorEntryBar
};

// ToDo: Update this story

export const Default = args => (
  <SmartComponentWrapper mocks={autoCatalogMocks.all()}>
    <ConfiguratorEntryBar {...args} />
  </SmartComponentWrapper>
);
Default.args = {};

// -------------------------------------------------------------------

export const Loading = args => (
  <SmartComponentWrapper mocks={autoCatalogMocks.all()} mockState="loading">
    <ConfiguratorEntryBar {...args} />
  </SmartComponentWrapper>
);
Loading.args = {};

// -------------------------------------------------------------------

export const Error = args => (
  <SmartComponentWrapper mocks={autoCatalogMocks.all()} mockState="error">
    <ConfiguratorEntryBar {...args} />
  </SmartComponentWrapper>
);
Error.args = {};
