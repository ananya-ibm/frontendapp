/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TradeIn } from './TradeIn';

export default {
  title: 'Components/Automotive/TradeIn',
  component: TradeIn
};

const normalStoryProps = {
  onClickTradein: () => {},
  onClickTerms: () => {},
  registrationNumber: 'BD51 SMR',
  estimatedValue: {
    value: '25000',
    currency: 'GBP',
    prefix: ''
  },
  text:
    'You added a car for trade-in. The estimated valuation of your car is displayed on the right. To change the trade-in option, click Edit trade-in.'
};

const addTradeInStoryProps = {
  onClickTerms: () => {},
  addTradeIn: {
    text: 'Add Trade-in',
    onClick: () => {}
  }
};

export const normal = args => <TradeIn {...args} />;
normal.args = normalStoryProps;

export const addTradeIn = args => <TradeIn {...args} />;
addTradeIn.args = addTradeInStoryProps;
