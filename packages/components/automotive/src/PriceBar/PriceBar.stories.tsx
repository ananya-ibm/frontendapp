/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { PriceBar } from './PriceBar';

export default {
  title: 'Components/Automotive/PriceBar',
  component: PriceBar
};

const storyProps = {
  addToCartText: 'add to cart',
  addToCartUrl: '#',
  financeLinkText: 'Calculate Finance',
  financeUrl: '#',
  price: {
    value: '25000',
    currency: 'GBP',
    prefix: ''
  },
  subscriptionCost: {
    value: '800',
    currency: 'GBP',
    prefix: '',
    rate: '/month'
  },
  testDriveText: 'book test drive',
  testDriveUrl: '#'
};

export const standard = args => <PriceBar {...args} />;
standard.args = storyProps;
