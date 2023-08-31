/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MemoryRouter } from 'react-router';
import { AddToCart } from './AddToCart';

export default {
  title: 'Features/Catalog/Components/AddToCart',
  component: AddToCart
};

type Props = React.ComponentProps<typeof AddToCart>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => (
  <MemoryRouter>
    <AddToCart {...args} />
  </MemoryRouter>
);
Default.args = {
  isEnabled: true,
  onAddToCart: async () => {}
} as Props;

// -------------------------------------------------------------------------------------------------------------

export const Disabled = (args: Props) => (
  <MemoryRouter>
    <AddToCart {...args} />
  </MemoryRouter>
);
Disabled.args = {
  ...Default.args,
  isEnabled: false
} as Props;
