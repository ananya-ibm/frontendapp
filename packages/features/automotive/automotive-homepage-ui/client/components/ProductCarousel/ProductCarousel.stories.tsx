/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductCarousel } from './ProductCarousel';

export default {
  title: 'Features/Automotive/HomePage/Components/ProductCarousel',
  component: ProductCarousel
};

export const Default = args => <ProductCarousel {...args} />;
Default.args = {};
