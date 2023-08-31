/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { PaymentMethods } from './PaymentMethods';

export default {
  title: 'Features/Account/Profile/Components/PaymentMethods',
  component: PaymentMethods
};

type Props = React.ComponentProps<typeof PaymentMethods>;

export const Default = (args: Props) => <PaymentMethods {...args} />;
Default.args = {
  payments: [
    {
      id: '001',
      cardType: 'Visa Debit Card',
      cardNo: '4242424242424242',
      firstName: 'Someone',
      lastName: 'Something',
      expiryDate: '2024-07-23T00:00:00+0000'
    },
    {
      id: '002',
      cardType: 'Visa Debit Card',
      cardNo: '4242424242424242',
      firstName: 'Someone',
      lastName: 'Something',
      expiryDate: '2024-07-23T00:00:00+0000'
    }
  ]
} as Props;

// -----------------------------------------------------------

export const Skeleton = () => <PaymentMethods.Skeleton />;
