/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { ProductBundleOverview } from './ProductBundleOverview';

export default {
  title: 'Features/Catalog/Components/ProductBundleOverview',
  component: ProductBundleOverview
};

type Props = React.ComponentProps<typeof ProductBundleOverview>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => <ProductBundleOverview {...args} />;
Default.args = {
  product: {
    children: Array.from(Array(5)).map(() => ({
      name: faker.commerce.productName(),
      thumbnail: faker.image.image(),
      price: {
        list: {
          currency: 'EUR',
          value: faker.commerce.price()
        },
        offer: {
          currency: 'EUR',
          value: faker.commerce.price()
        }
      }
    }))
  }
} as Props;

export const Skeleton = args => <ProductBundleOverview.Skeleton {...args} />;
