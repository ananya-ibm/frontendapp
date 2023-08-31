/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { CategoryPage } from './CategoryPage';
import App from '../../App';
import b2cCatalogMocks from '../../../mocks/b2c-catalog';
import { catalogConfig } from '../../../mocks/catalog-config';

export default {
  title: 'Features/Catalog/Pages/CategoryPage',
  component: CategoryPage,
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
    mocks={b2cCatalogMocks.category()}
    urlPath="/catalog/category/apparel/Trousers/Jeans"
  >
    <CategoryPage {...args} />
  </ContainerWrapper>
);
Default.args = {
  catalogConfig,
  categoryId: '123',
  categoryPath: ['456']
};

// -----------------------------------------------------------------------
export const Loading = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.category()}
    mockState="loading"
    urlPath="/catalog/category/apparel/Trousers/Jeans"
  >
    <CategoryPage {...args} />
  </ContainerWrapper>
);
Loading.args = {
  ...Default.args
};

// -----------------------------------------------------------------------
export const Error = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.category()}
    mockState="error"
    urlPath="/catalog/category/apparel/Trousers/Jeans"
  >
    <CategoryPage {...args} />
  </ContainerWrapper>
);
Error.args = {
  ...Default.args
};

// -----------------------------------------------------------------------
