/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Leases } from './Leases';

export default {
  title: 'Features/Automotive/Account/Components/Leases',
  component: Leases
};

export const Default = args => <Leases {...args} />;
Default.args = {
  title: 'My leases',
  activeLeases: [
    {
      name: 'Lease Agreement',
      expiry: 'Expires: 13/01/2021',
      cost: '£59.99/Month',
      payment: 'Paid with Direct Debit',
      mileageLimit: '100,000',
      termDuration: '5 years',
      upfrontPayment: '£2,000.00'
    }
  ],
  expiredLeases: [
    {
      name: 'Lease Agreement',
      expiry: 'Expires: 13/01/2021',
      cost: '£59.99/Month',
      payment: 'Paid with Direct Debit',
      mileageLimit: '100,000',
      termDuration: '5 years',
      upfrontPayment: '£2,000.00'
    }
  ]
};
