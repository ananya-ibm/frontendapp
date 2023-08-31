/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AddressInput } from './AddressInput';

export default {
  title: 'Features/Checkout/Components/AddressInput',
  component: AddressInput
};

type Props = React.ComponentProps<typeof AddressInput>;

export const Default = (args: Props) => <AddressInput {...args} />;
Default.args = {
  type: 'shipping'
} as Props;

// ----------------------------------------------------------------

export const Billing = (args: Props) => <AddressInput {...args} />;
Billing.args = {
  type: 'billing'
} as Props;

// ----------------------------------------------------------------
export const WithInput = (args: Props) => <AddressInput {...args} />;
WithInput.args = {
  type: 'billing',
  addressToDisplay: {
    id: '1',
    firstName: 'John',
    lastName: 'Doe'
  }
} as Props;

// ----------------------------------------------------------------

export const Skeleton = () => <AddressInput.Skeleton />;
