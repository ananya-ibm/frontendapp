/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductPrice } from './ProductPrice';

export default {
  title: 'Features/Catalog/Components/ProductPrice',
  component: ProductPrice
};

type Props = React.ComponentProps<typeof ProductPrice>;

export const Default = (args: Props) => <ProductPrice {...args} />;
Default.args = {
  price: {
    list: {
      currency: 'EUR',
      value: 699
    },
    offer: {
      currency: 'EUR',
      value: 649
    }
  }
} as Props;

// --------------------------------------------------------
export const OnlyListPrice = (args: Props) => <ProductPrice {...args} />;
OnlyListPrice.args = {
  price: {
    list: {
      currency: 'EUR',
      value: 1349
    }
  }
} as Props;

// --------------------------------------------------------
export const Skeleton = args => <ProductPrice.Skeleton {...args} />;
