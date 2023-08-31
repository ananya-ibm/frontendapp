/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CartButtons } from './CartButtons';

export default {
  title: 'Features/Cart/Components/CartButtons',
  component: CartButtons
};

type Props = React.ComponentProps<typeof CartButtons>;

export const Default = (args: Props) => <CartButtons {...args} />;
Default.args = {
  next: 'Next',
  previous: 'Previous',
  onNext: () => {},
  onPrevious: () => {}
} as Props;

// -------------------------------------------

export const Disabled = (args: Props) => <CartButtons {...args} />;
Disabled.args = {
  ...Default.args,
  isDisabled: true
} as Props;
