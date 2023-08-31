/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductDetails } from './ProductDetails';

export default {
  title: 'Features/Catalog/Components/ProductDetails',
  component: ProductDetails
};

type Props = React.ComponentProps<typeof ProductDetails>;

export const Default = (args: Props) => <ProductDetails {...args} />;
Default.args = {
  product: {
    attributes: [
      {
        id: '1',
        name: 'Basematerial',
        value: { value: 'Particleboard, Paper foil, Plastic edging', id: 'a' }
      },
      {
        id: '2',
        name: 'Side panel',
        value: { value: 'Particleboard, Paper foil, Melamine foil, Plastic edging', id: 'b' }
      },
      { id: '3', name: 'Plinth front', value: { value: 'Particleboard, Paper foil', id: 'c' } },
      { id: '4', name: 'Back', value: { value: 'Fibreboard, Paint, Paper foil', id: 'd' } }
    ]
  }
} as Props;

// ------------------------------------------------------------------
export const Skeleton = args => <ProductDetails.Skeleton {...args} />;
