/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BnkBalance } from './BnkBalance';

type Props = React.ComponentProps<typeof BnkBalance>;

export default {
  title: 'Features/Banking/BnkBalance',
  component: BnkBalance
};

export const Default = (args: Props) => <BnkBalance {...args} />;
Default.args = {
  data: {
    amount: {
      amount: '1,234.00',
      currency: 'GBP'
    },
    creditLine: [{
      amount: {
        amount: '1,000.00',
        currency: 'GBP'
      }
    }]
  }
} as Props;
