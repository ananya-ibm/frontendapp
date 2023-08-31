/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Payments } from './Payments';

export default {
  title: 'Features/Automotive/Account/Components/Payments',
  component: Payments
};

export const Default = args => <Payments {...args} />;
Default.args = {
  payments: [
    {
      refer: 'Payment Reference:  ',
      referNumber: '#32454636',
      order: 'Order Reference: ',
      orderNumber: '#149874134',
      title: 'Car Reservation Deposit  ',
      approveDate: 'Payment approved: 04/09/2020',
      cost: '£800',
      payment: 'Paid with Direct Debit'
    }
  ]
};
