/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { CartItemList } from './CartItemList';

import img1 from '../../../../../catalog/catalog-ui/mocks/b2c-images/IBMEMB001_EMB001_514.jpg';

export default {
  title: 'Features/Cart/Components/CartItemList',
  component: CartItemList
};

type Props = React.ComponentProps<typeof CartItemList>;

export const Default = (args: Props) => <CartItemList {...args} />;
Default.args = {
  cart: {
    lineItems: [1, 2, 3].map(i => ({
      product: {
        id: '123',
        partnumber: 'abc',
        type: 'product',
        name: 'Emb(race) T-shirt',
        description: faker.commerce.productDescription(),
        thumbnail: img1
      },
      quantity: 3,
      id: i.toString(),
      partnumber: 'abc',
      unitPrice: {
        currency: 'EUR',
        value: 12.5
      },
      linePrice: {
        currency: 'EUR',
        value: 37.5
      }
    })),
    grandTotal: {
      value: 405.5,
      currency: 'EUR'
    }
  },
  hasTotal: true
} as Props;

// ---------------------------------------------------------------------

export const WithIsReadonly = (args: Props) => <CartItemList {...args} />;
WithIsReadonly.args = {
  ...Default.args,
  isReadOnly: true
} as Props;

// ---------------------------------------------------------------------

export const Skeleton = (args: any) => <CartItemList.Skeleton {...args} />;
Skeleton.args = {};
