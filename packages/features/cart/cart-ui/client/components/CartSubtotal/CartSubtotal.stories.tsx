/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CartSubtotal } from './CartSubtotal';

export default {
  title: 'Features/Cart/Components/CartSubtotal',
  component: CartSubtotal
};

type Props = React.ComponentProps<typeof CartSubtotal>;

export const Default = (args: Props) => <CartSubtotal {...args} />;
Default.args = {
  cart: {
    grandTotal: {
      value: '405.5',
      currency: 'EUR'
    },
    totalProductPrice: {
      value: '300',
      currency: 'EUR'
    },
    totalSalesTax: {
      value: '60',
      currency: 'EUR'
    },
    totalShippingCharge: {
      value: '30',
      currency: 'EUR'
    },
    totalShippingTax: {
      value: '30',
      currency: 'EUR'
    },
    totalAdjustment: {
      value: '5.5',
      currency: 'EUR'
    },
    adjustments: [
      {
        title: 'Adjustment 1',
        amount: { value: '2', currency: 'EUR' }
      },
      {
        title: 'Adjustment 2',
        amount: { value: '3.5', currency: 'EUR' }
      }
    ]
  }
} as Props;

// ------------------------------------------------------------------

export const Skeleton = () => <CartSubtotal.Skeleton />;
