/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BnkTransactions } from './BnkTransactions';

type Props = React.ComponentProps<typeof BnkTransactions>;

export default {
  title: 'Features/Banking/BnkTransactions',
  component: BnkTransactions
};

export const Default = (args: Props) => <BnkTransactions {...args} />;
Default.args = {
  data: [
    {
      transactionInformation: 'Payment 1',
      bookingDateTime: '2017-04-05T10:43:07+00:00',
      balance: {
        amount: {
          amount: '1,000.00',
          currency: 'GBP'
        }
      },
      amount: {
        amount: '200.00',
        currency: 'GBP'
      },
      creditDebitIndicator: 'CREDIT'
    },
    {
      transactionInformation: 'Payment 2',
      bookingDateTime: '2017-04-05T10:43:07+00:00',
      balance: {
        amount: {
          amount: '1,000.00',
          currency: 'GBP'
        }
      },
      amount: {
        amount: '100.00',
        currency: 'GBP'
      },
      creditDebitIndicator: 'DEBIT'
    }
]
} as Props;
