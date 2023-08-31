/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductHero } from './ProductHero';

export default {
  title: 'Features/Catalog/Components/ProductHero',
  component: ProductHero
};

type Props = React.ComponentProps<typeof ProductHero>;

export const Default = (args: Props) => <ProductHero {...args} />;
Default.args = {
  description: 'Description goes here',
  id: '1',
  name: 'Product',
  fullImage: '/static/automotive/hero.png'
} as Props;
