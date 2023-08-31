/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BaseProductGrid } from '../BaseProductGrid/BaseProductGrid';

export const StoreProductGrid = ({ products: productData }) => {
  // TODO: Get data from BE via GQL query
  const products = {
    data: productData,
    loading: false,
    error: null,
    onLoadMore: () => {}
  };
  return <BaseProductGrid products={products} />;
};
