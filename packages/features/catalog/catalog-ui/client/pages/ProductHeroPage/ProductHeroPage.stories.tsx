/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { ProductHeroPage } from './ProductHeroPage';
import App from '../../App';
import b2cCatalogMocks from '../../../mocks/b2c-catalog';
import { catalogConfig } from '../../../mocks/catalog-config';

export default {
  title: 'Features/Catalog/Pages/ProductHeroPage',
  component: ProductHeroPage,
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
    urlPath="/catalog/products/DeLoreanTimeMachine/_"
  >
    <ProductHeroPage {...args} />
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
    urlPath="/catalog/products/DeLoreanTimeMachine/_"
  >
    <ProductHeroPage {...args} />
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
    urlPath="/catalog/products/DeLoreanTimeMachine/_"
  >
    <ProductHeroPage {...args} />
  </ContainerWrapper>
);
Error.args = {
  ...Default.args
};

// ------------------------------------------------------------------
