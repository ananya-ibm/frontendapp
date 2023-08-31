/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MiniCart } from './MiniCart';

type Props = React.ComponentProps<typeof MiniCart>;

export default {
  title: 'Features/Cart/Components/MiniCart',
  component: MiniCart
};

export const Default = (args: Props) => <MiniCart {...args} />;
Default.args = {} as Props;

// -----------------------------------------

export const WithCount = (args: Props) => <MiniCart {...args} />;
WithCount.args = {
  count: 13
} as Props;
