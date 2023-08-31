/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OrderSummary } from './OrderSummary';

export default {
  title: 'Components/Commerce/OrderSummary',
  component: OrderSummary
};

export const normal = args => <OrderSummary {...args} />;
normal.args = {
  subTotalPrice: {
    value: '59.99',
    currency: 'USD',
    format: 'en-US'
  },
  totalItems: 3,
  discountPrice: {
    prefix: '-',
    value: '10.99',
    currency: 'USD',
    format: 'en-US'
  },
  shippingCharge: {
    value: '5.50',
    currency: 'USD',
    format: 'en-US'
  },
  taxCharges: {
    value: '2.80',
    currency: 'USD',
    format: 'en-US'
  },
  totalDays: 2,
  orderTotalPrice: {
    value: '57.30',
    currency: 'USD',
    format: 'en-US'
  }
};
