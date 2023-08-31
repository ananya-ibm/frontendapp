/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { QuickOrder } from './QuickOrder';

export default {
  title: 'Features/B2B/QuickOrder/Components/QuickOrder',
  component: QuickOrder
};

export const Default = args => <QuickOrder {...args} />;
Default.args = {
  title: 'Quick Order',
  description:
    'You can add up to 25 valid SKUs below and add to cart. Stock is reserved once products are added to cart.',
  onAddToCart: () => {},
  onSearch: () => {},
  onReset: () => {},
  onRemoveItem: () => {}
};

export const error = args => <QuickOrder {...args} />;
error.args = {
  title: 'Quick Order',
  description:
    'You can add up to 25 valid SKUs below and add to cart. Stock is reserved once products are added to cart.',
  onAddToCart: () => {},
  onSearch: () => {},
  onReset: () => {},
  onRemoveItem: () => {},
  error: 'Can\'t find product'
};

export const loading = args => <QuickOrder {...args} />;
loading.args = {
  title: 'Quick Order',
  description:
    'You can add up to 25 valid SKUs below and add to cart. Stock is reserved once products are added to cart.',
  onAddToCart: () => {},
  onSearch: () => {},
  onReset: () => {},
  onRemoveItem: () => {},
  isLoading: true
};

export const withProducts = args => <QuickOrder {...args} />;
withProducts.args = {
  title: 'Quick Order',
  description:
    'You can add up to 25 valid SKUs below and add to cart. Stock is reserved once products are added to cart.',
  onAddToCart: () => {},
  onSearch: () => {},
  onReset: () => {},
  onRemoveItem: () => {},
  foundProducts: [
    {
      id: 'power-drill',
      partnumber: 'power-drill',
      name: 'Power drill',
      qty: 2,
      price: {
        list: { currency: 'GBP', value: 79 },
        offer: { currency: 'GBP', value: 72 }
      },
      thumbnail: 'static/commerce/tool.jpeg'
    },
    {
      id: 'super-stereo',
      partnumber: 'super-stereo',
      name: 'Stereo',
      qty: 1,
      price: {
        list: { currency: 'GBP', value: 120 }
      },
      thumbnail: 'static/commerce/tool.jpeg'
    }
  ]
};
