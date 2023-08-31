/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CheckoutPage } from './CheckoutPage';

type Props = React.ComponentProps<typeof CheckoutPage>;

export default {
  title: 'Features/Express checkout/Pages/CheckoutPage',
  component: CheckoutPage
};

export const Default = (args: Props) => <CheckoutPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;