/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount } from './MonetaryAmount';

export default {
  title: 'Components/Core/MonetaryAmount',
  component: MonetaryAmount
};

export const GBP = args => <MonetaryAmount {...args} />;
GBP.args = {
  value: '10.03',
  currency: 'GBP'
};

export const GBPWithDiscount = args => <MonetaryAmount {...args} />;
GBPWithDiscount.args = {
  priceObject: {
    list: {
      value: '10.03',
      currency: 'GBP'
    },
    offer: {
      value: '8.03',
      currency: 'GBP'
    }
  }
};

export const USD = args => <MonetaryAmount {...args} />;
USD.args = {
  value: '10000',
  currency: 'USD',
  format: 'en-US'
};

export const EU = args => <MonetaryAmount {...args} />;
EU.args = {
  value: '10.00',
  currency: 'EUR',
  format: 'FR'
};

export const Subscription = args => <MonetaryAmount {...args} />;
Subscription.args = {
  prefix: 'From ',
  value: '1000',
  currency: 'EUR',
  format: 'en-GB',
  rate: 'per month'
};
