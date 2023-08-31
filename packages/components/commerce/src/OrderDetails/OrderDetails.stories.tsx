/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OrderDetails } from './OrderDetails';

export default {
  title: 'Components/Commerce/OrderDetails',
  component: OrderDetails
};

export const normal = args => <OrderDetails {...args} />;
normal.args = {
  title: 'Order Details',
  subTitle: 'Order Number: ',
  orderNumber: '0003835',
  orderDate: 'September 15, 2018',
  billingAddress: 'John Smith, 640, Hamilton circle Malvern, PA 19355',
  shippingAddress: 'John Smith, 640, Hamilton circle Malvern, PA 19355',
  paymentMethod: 'visa********9257',
  orderStatus: 'Shipped on Tuesday, June 23 USPS Priority Mail',
  trackingId: '097654334566111222221111',
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
  grandTotal: {
    value: '57.30',
    currency: 'USD',
    format: 'en-US'
  },
  orders: [
    {
      id: '0002',
      quantity: 1,
      brandName: 'Titan',
      size: 'Large',
      color: 'Golden',
      item: {
        thumbnail: 'https://images.unsplash.com/photo-1476286768413-e7051cdb2179',
        name: 'Titan Raga'
      },
      linePrice: {
        value: '9.99',
        currency: 'USD',
        format: 'en-US'
      }
    },
    {
      id: '0003',
      quantity: 2,
      brandName: 'Rebook',
      size: '7',
      color: 'Black',
      item: {
        thumbnail: 'https://images.unsplash.com/photo-1596018589855-e9a2a91f687f',
        name: 'Athletic Shoes'
      },
      linePrice: {
        value: '24.54',
        currency: 'USD',
        format: 'en-US'
      }
    }
  ]
};
