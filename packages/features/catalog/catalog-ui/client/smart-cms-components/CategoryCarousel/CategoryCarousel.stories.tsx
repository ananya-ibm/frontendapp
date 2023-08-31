/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { CategoryCarousel } from './CategoryCarousel';
import b2cCatalogMocks from '../../../mocks/b2c-catalog';

export default {
  title: 'Features/Catalog/Smart CMS Components/CategoryCarousel',
  component: CategoryCarousel
};

export const Default = args => (
  <SmartComponentWrapper mocks={b2cCatalogMocks.category()}>
    <CategoryCarousel {...args} />
  </SmartComponentWrapper>
);
Default.args = {
  catId: 'abc',
  title: 'Top Selling Products'
};

// ----------------------------------------------------------------------------

export const Loading = args => (
  <SmartComponentWrapper mocks={b2cCatalogMocks.category()} mockState="loading">
    <CategoryCarousel {...args} />
  </SmartComponentWrapper>
);
Loading.args = {
  catId: 'abc',
  title: 'Top Selling Products'
};
