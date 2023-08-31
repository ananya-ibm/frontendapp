/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Product } from './Product';

export default {
  title: 'Components/Extra/Product',
  component: Product
};

const storyProps = {
  addToBasketHandler: () => {},
  id: '572461',
  partnumber: '572461',
  name: 'GR-80TP Extension Battery Grip/Tripod',
  longDescription: 'GR-80TP Extension Battery Grip/Tripod for EOS Rebel G.',
  description: 'GR-80TP Extension Battery Grip/Tripod',
  fullImage: 'https://images.unsplash.com/photo-1534949119444-a092348af7dc',
  type: 'product',
  price: {
    offer: {
      value: '45.65',
      currency: 'EUR'
    },
    list: {
      value: '48.65',
      currency: 'EUR'
    }
  }
};

export const normal = args => <Product {...args} />;
normal.args = storyProps;
