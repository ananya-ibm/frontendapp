/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MemoryRouter } from 'react-router';
import { SimpleAddToCart } from './SimpleAddToCart';

export default {
  title: 'Features/Catalog/Components/SimpleAddToCart',
  component: SimpleAddToCart
};

type Props = React.ComponentProps<typeof SimpleAddToCart>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => (
  <MemoryRouter>
    <SimpleAddToCart {...args} />
  </MemoryRouter>
);
Default.args = {
  isEnabled: true,
  onAddToCart: async () => {}
} as Props;

// -------------------------------------------------------------------------------------------------------------

export const Disabled = (args: Props) => (
  <MemoryRouter>
    <SimpleAddToCart {...args} />
  </MemoryRouter>
);
Disabled.args = {
  ...Default.args,
  isEnabled: false
} as Props;
