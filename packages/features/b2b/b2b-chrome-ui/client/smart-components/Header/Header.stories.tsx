/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { Header } from './Header';
import b2cNavigationMocks from '../../../mocks/b2c';
import b2cConfig from '../../../../../../apps/commerce/applications';

export default {
  title: 'Features/B2B/Chrome/Smart Components/Header',
  component: Header,
  parameters: { docs: { source: { type: 'code' } } }
};

export const Default = args => (
  <SmartComponentWrapper mocks={b2cNavigationMocks} config={b2cConfig}>
    <Header {...args} />
  </SmartComponentWrapper>
);
Default.args = {
  config: b2cConfig.featureConfig.chrome
};

// ----------------------------------------------------------------------------------------

export const Loading = args => (
  <SmartComponentWrapper mocks={b2cNavigationMocks} config={b2cConfig} mockState="loading">
    <Header {...args} />
  </SmartComponentWrapper>
);
Loading.args = {
  ...Default.args
};

// ----------------------------------------------------------------------------------------

export const Error = args => (
  <SmartComponentWrapper mocks={b2cNavigationMocks} config={b2cConfig} mockState="error">
    <Header {...args} />
  </SmartComponentWrapper>
);
Error.args = {
  ...Default.args
};

// ----------------------------------------------------------------------------------------
