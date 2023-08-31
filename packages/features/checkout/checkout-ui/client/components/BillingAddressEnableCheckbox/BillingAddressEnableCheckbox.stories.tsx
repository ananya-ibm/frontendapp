/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BillingAddressEnableCheckbox } from './BillingAddressEnableCheckbox';

export default {
  title: 'Features/Checkout/Components/BillingAddressEnableCheckbox',
  component: BillingAddressEnableCheckbox
};

type Props = React.ComponentProps<typeof BillingAddressEnableCheckbox>;

export const Default = (args: Props) => <BillingAddressEnableCheckbox {...args} />;
Default.args = {
  isBillingEnabled: false,
  onCheck: () => {}
} as Props;

// ---------------------------------------------------

export const Enabled = (args: Props) => <BillingAddressEnableCheckbox {...args} />;
Enabled.args = {
  isBillingEnabled: true,
  onCheck: () => {}
} as Props;
