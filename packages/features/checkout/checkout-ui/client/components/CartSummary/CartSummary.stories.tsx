/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CartSummary } from './CartSummary';

export default {
  title: 'Features/Checkout/Components/CartSummary',
  component: CartSummary
};

type Props = React.ComponentProps<typeof CartSummary>;

const storyProps = {
  cart: {
    grandTotal: {
      value: 405.5,
      currency: 'EUR'
    },
    totalShippingCharge: {
      value: 27.9,
      currency: 'EUR'
    },
    totalShippingTax: {
      value: 3.2,
      currency: 'EUR'
    }
  }
} as Props;

export const Default = (args: Props) => <CartSummary {...args} />;
Default.args = {
  ...storyProps
} as Props;

export const ConfirmationPage = (args: Props) => <CartSummary {...args} />;
ConfirmationPage.args = {
  ...Default.args,
  isConfirmation: true
} as Props;

export const Skeleton = () => <CartSummary.Skeleton />;
