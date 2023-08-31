/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { PriceTable } from './PriceTable';

export default {
  title: 'Components/Core/PriceTable',
  component: PriceTable
};

const storyProps = {
  priceBreakdown: [
    {
      text: 'Base Price',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    },
    {
      text: 'Exterior Additions',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 300
      }
    },
    {
      text: 'Interior Additions',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 50000
      }
    },
    {
      text: 'Total cost',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 35500
      }
    }
  ]
};

const storyProps2 = {
  priceBreakdown: [
    {
      text: 'Base Price',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    },
    {
      text: 'Exterior Additions',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 300
      },
      helpText: 'Helpful info about Exterior Additions'
    },
    {
      text: 'Duration',
      value: '24 months',
      helpText: 'Lease duration'
    }
  ]
};

export const normal = args => <PriceTable {...args} />;
normal.args = storyProps;

export const withHelpText = args => <PriceTable {...args} />;
withHelpText.args = storyProps2;
