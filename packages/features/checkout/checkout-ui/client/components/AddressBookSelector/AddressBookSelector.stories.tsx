/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AddressBookSelector } from './AddressBookSelector';

export default {
  title: 'Features/Checkout/Components/AddressBookSelector',
  component: AddressBookSelector
};

type Props = React.ComponentProps<typeof AddressBookSelector>;

export const Default = (args: Props) => <AddressBookSelector {...args} />;
Default.args = {
  addresses: [
    { id: '1', address1: 'CHQ' },
    { id: '2', address1: 'Branch Office - New York' },
    { id: '3', address1: 'Home' }
  ],
  selectedAddress: {}
} as Props;

// ----------------------------------------------------

export const Selected = (args: Props) => <AddressBookSelector {...args} />;
Selected.args = {
  ...Default.args,
  selectedAddress: {
    id: '2',
    address1: 'Branch Office - New York'
  }
} as Props;

// ----------------------------------------------------

export const Skeleton = () => <AddressBookSelector.Skeleton />;

// ----------------------------------------------------
