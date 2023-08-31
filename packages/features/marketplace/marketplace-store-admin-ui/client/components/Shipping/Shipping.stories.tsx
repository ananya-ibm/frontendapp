/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Shipping } from './Shipping';

export default {
  title: 'Features/Marketplace/Admin/Components/Shipping',
  component: Shipping
};

export const Default = args => <Shipping {...args} />;
Default.args = {
  shippingMethods: [
    {
      id: 'Flat rate shipping',
      shipping_method_range: '0 - 60',
      shipping_method_rate: '4.50'
    }
  ]
};
