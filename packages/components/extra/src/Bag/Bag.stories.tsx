/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Bag } from './Bag';

export default {
  title: 'Components/Extra/Bag',
  component: Bag
};

const storyProps = {
  basketUrl: '/basket',
  cartQuantity: 5
};

export const withItems = args => <Bag {...args} />;
withItems.args = storyProps;

export const empty = args => <Bag {...args} />;
empty.args = {
  ...storyProps,
  cartQuantity: null
};
