/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { ProductSummary } from './ProductSummary';

export default {
  title: 'Features/Catalog/Components/ProductSummary',
  component: ProductSummary
};

type Props = React.ComponentProps<typeof ProductSummary>;

export const Default = (args: Props) => <ProductSummary {...args} />;
Default.args = {
  product: {
    partnumber: 'IBMAC014',
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    longDescription: faker.lorem.paragraph()
  }
} as Props;

// --------------------------------------------------------
export const Skeleton = args => <ProductSummary.Skeleton {...args} />;
