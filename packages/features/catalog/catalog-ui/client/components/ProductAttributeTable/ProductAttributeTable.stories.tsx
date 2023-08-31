/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductAttributeTable } from './ProductAttributeTable';

export default {
  title: 'Features/Catalog/Components/ProductAttributeTable',
  component: ProductAttributeTable
};

type Props = React.ComponentProps<typeof ProductAttributeTable>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => <ProductAttributeTable {...args} />;
Default.args = {
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
} as Props;

export const Skeleton = () => <ProductAttributeTable.Skeleton />;
