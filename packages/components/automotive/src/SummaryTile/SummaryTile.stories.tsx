/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SummaryTile } from './SummaryTile';

export default {
  title: 'Components/Automotive/SummaryTile',
  configuration: SummaryTile
};

const priceStoryProps = {
  title: 'Colour',
  text: 'Blue',
  amount: {
    prefix: '+',
    currency: 'GBP',
    value: 500
  },
  thumbnail: '/static/automotive/thumbnails/yellow.png',
  onChange: () => {},
  changeButtonText: 'Change selection'
};

const versionStoryProps = {
  title: 'Wheels',
  text: 'Michelin',
  version: 'R16 V Tyre',
  thumbnail: '/static/automotive/thumbnails/yellow.png',
  onChange: () => {},
  changeButtonText: 'Change selection'
};

export const withPrice = args => <SummaryTile {...args} />;
withPrice.args = priceStoryProps;

export const withVersion = args => <SummaryTile {...args} />;
withVersion.args = versionStoryProps;
