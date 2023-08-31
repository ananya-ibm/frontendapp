/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductBrowseCarousel } from '@exo/frontend-components-automotive';
import { getClientImagePath } from '@exo/frontend-common-utils';

export const ProductCarousel = () => {
  // const { config } = useAppShellContext();
  // const imgSrc = `${config.cdn}/content/homepage/products/`;
  const imgPath = '/static/content/homepage/products/';
  const items = [
    {
      id: 1,
      image: getClientImagePath(`${imgPath}interceptor.jpg`),
      alt: 'Interceptor',
      price: {
        value: 45000,
        currency: 'GBP',
        prefix: '£',
        rate: '/On the road*'
      },
      product_name: 'The Pursuit Special',
      product_description: 'Last of the V8 Interceptors',
      financeOptions: '/cart/finance',
      product_stats: [
        { name: 'Stats1', stats: '80' },
        { name: 'Stats2', stats: '80' },
        { name: 'Stats3', stats: '80' },
        { name: 'Stats4', stats: '80' }
      ]
    },
    {
      id: 2,
      image: getClientImagePath(`${imgPath}batmobile.jpg`),
      alt: 'Grantorino',
      price: {
        value: 45000,
        currency: 'GBP',
        prefix: '£',
        rate: '/On the road*'
      },
      product_name: 'The Pursuit Special',
      product_description: 'Last of the V8 Interceptors',
      financeOptions: '/cart/finance',
      product_stats: [
        { name: 'Stats1', stats: '80' },
        { name: 'Stats2', stats: '90' },
        { name: 'Stats3', stats: '80' },
        { name: 'Stats4', stats: '80' }
      ]
    },
    {
      id: 3,
      image: getClientImagePath(`${imgPath}submarineCar.jpg`),
      alt: 'OriginalBatMobile',
      price: {
        value: 45000,
        currency: 'GBP',
        prefix: '£',
        rate: '/On the road*'
      },
      product_name: 'The Pursuit Special',
      product_description: 'Last of the V8 Interceptors',
      financeOptions: '/cart/finance',
      product_stats: [
        { name: 'Stats1', stats: '70' },
        { name: 'Stats2', stats: '70' },
        { name: 'Stats3', stats: '70' },
        { name: 'Stats4', stats: '70' }
      ]
    },
    {
      id: 4,
      image: getClientImagePath(`${imgPath}starwarsCar.jpg`),
      alt: 'Landspeeder',
      price: {
        value: 46000,
        currency: 'GBP',
        prefix: '£',
        rate: '/On the road*'
      },
      product_name: 'The Pursuit Special',
      product_description: 'Last of the V8 Interceptors',
      financeOptions: '/cart/finance',
      product_stats: [
        { name: 'Stats1', stats: '100' },
        { name: 'Stats2', stats: '100' },
        { name: 'Stats3', stats: '100' },
        { name: 'Stats4', stats: '100' }
      ]
    }
  ];

  return (
    <ProductBrowseCarousel
      title="A vehicle for any superhero"
      description="See our full range of vehicles and find the one that best fits your lifestyle"
      productRangeLink="/catalog/category/Vehicles"
      items={items}
    />
  );
};
