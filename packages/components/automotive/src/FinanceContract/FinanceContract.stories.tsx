/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FinanceContract } from './FinanceContract';

export default {
  title: 'Components/Automotive/FinanceContract',
  component: FinanceContract
};

const storyProps = {
  selectedFinanceOption: 'Personal Contract Purchase',
  monthlyPrice: {
    currency: 'GBP',
    value: 1200
  },
  termsLink: '#',
  priceBreakdown: [
    {
      text: 'Listing Price',
      helpText: 'The listing price',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    },
    {
      text: 'Duration',
      value: '12months'
    },
    {
      text: 'Deposit',
      amount: {
        currency: 'GBP',
        value: 5000
      }
    },
    {
      text: 'Optional final payment',
      amount: {
        currency: 'GBP',
        value: 5000
      }
    },
    {
      text: 'APR',
      helpText: 'annual percentage rate',
      value: '2.1% APR'
    },
    {
      text: 'Fixed Rate of Interest',
      value: '2.1% p.a.'
    },
    {
      text: 'Cost of credit',
      amount: {
        currency: 'GBP',
        value: 100
      }
    }
  ]
};

export const normal = args => <FinanceContract {...args} />;
normal.args = storyProps;
