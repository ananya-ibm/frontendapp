/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { MiniCartPresentation } from './MiniCartPresentation';

// TODO: This is really a SmartComponent

export default {
  title: 'Features/Automotive/Cart/Api/Components/MiniCartPresentation',
  component: MiniCartPresentation
};

export const Default = args => (
  <SmartComponentWrapper>
    <MiniCartPresentation {...args} />
  </SmartComponentWrapper>
);
Default.args = {};

// -----------------------------------------

export const WithCount = args => (
  <SmartComponentWrapper>
    <MiniCartPresentation {...args} />
  </SmartComponentWrapper>
);
WithCount.args = {
  count: 13
};

// -----------------------------------------

export const WithCountAndColor = args => (
  <SmartComponentWrapper>
    <MiniCartPresentation {...args} />
  </SmartComponentWrapper>
);
WithCountAndColor.args = {
  count: 13,
  currentColor: '#00ff00'
};

// -----------------------------------------
