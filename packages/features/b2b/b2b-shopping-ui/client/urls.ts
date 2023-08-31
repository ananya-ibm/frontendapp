/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CategoryUrlFactory } from '@exo/frontend-features-catalog-logic';

export type UrlFactory = {
  category: CategoryUrlFactory;
  categoryWithProducts: (string) => string;
  product: (string) => string;
  root: () => string;
};

export const urlFactory: UrlFactory = {
  category: categories => `/shop/category/${categories[categories.length - 1].id}`,
  categoryWithProducts: id => `/shop/category/${id}/products`,
  product: id => `/shop/products/${id}`,
  root: () => '/shop'
};
