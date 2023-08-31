/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { ProductDetailsPage } from './ProductDetailsPage';
import App from '../../App';
import b2cCatalogMocks from '../../../mocks/b2c-catalog';
import { catalogConfig } from '../../../mocks/catalog-config';

export default {
  title: 'Features/Catalog/Pages/ProductDetailsPage',
  component: ProductDetailsPage,
  decorators: [
    Story => {
      return (
        <div style={{ margin: '-1em' }}>
          <Story />
        </div>
      );
    }
  ]
};

export const Default = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.product()}
    urlPath="/catalog/products/MCL011_1101/_"
  >
    <ProductDetailsPage {...args} catalogConfig />
  </ContainerWrapper>
);
Default.args = {
  catalogConfig,
  productId: '123'
};

// ------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.product()}
    mockState="loading"
    urlPath="/catalog/products/MCL011_1101/_"
  >
    <ProductDetailsPage {...args} />
  </ContainerWrapper>
);
Loading.args = {
  ...Default.args
};

// ------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.product()}
    mockState="error"
    urlPath="/catalog/products/MCL011_1101/_"
  >
    <ProductDetailsPage {...args} />
  </ContainerWrapper>
);
Error.args = {
  ...Default.args
};

// ------------------------------------------------------------------

export const BundleOfSkus = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.product('bundleOfSkus')}
    urlPath="/catalog/products/MCL011_1101/_"
  >
    <ProductDetailsPage {...args} />
  </ContainerWrapper>
);
BundleOfSkus.args = {
  ...Default.args
};

// ------------------------------------------------------------------

export const Product = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.product('product')}
    urlPath="/catalog/products/MCL011_1101/_"
  >
    <ProductDetailsPage {...args} />
  </ContainerWrapper>
);
Product.args = {
  ...Default.args
};
