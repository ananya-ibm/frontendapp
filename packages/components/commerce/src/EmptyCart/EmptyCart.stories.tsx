/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { EmptyCart } from './EmptyCart';

export default {
  title: 'Components/Commerce/EmptyCart',
  component: EmptyCart
};

const storyProps = {
  secondayUrl: '#',
  primaryUrl: '#',
  secondaryText: 'Find services',
  primaryText: 'Find products'
};

export const normal = args => <EmptyCart {...args} />;
normal.args = storyProps;
