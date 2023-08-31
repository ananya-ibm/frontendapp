/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { SearchPage } from './SearchPage';
import App from '../../App';
import b2cCatalogMocks from '../../../mocks/b2c-catalog';
import { catalogConfig } from '../../../mocks/catalog-config';

export default {
  title: 'Features/Catalog/Pages/SearchPage',
  component: SearchPage,
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
  <ContainerWrapper app={App} mocks={b2cCatalogMocks.search()} urlPath="/catalog/search/shirt">
    <SearchPage {...args} />
  </ContainerWrapper>
);
Default.args = {
  catalogConfig,
  term: 'Shirt'
};

// -------------------------------------------------------------------

export const Loading = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.search()}
    mockState="loading"
    urlPath="/catalog/search/shirt"
  >
    <SearchPage {...args} />
  </ContainerWrapper>
);
Loading.args = {
  ...Default.args
};

// -------------------------------------------------------------------

export const Error = args => (
  <ContainerWrapper
    app={App}
    mocks={b2cCatalogMocks.search()}
    mockState="error"
    urlPath="/catalog/search/shirt"
  >
    <SearchPage {...args} />
  </ContainerWrapper>
);
Error.args = {
  ...Default.args
};

// -------------------------------------------------------------------
