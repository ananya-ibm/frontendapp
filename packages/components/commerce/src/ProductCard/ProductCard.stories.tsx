/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Link } from '@exo/frontend-common-link';
import React from 'react';
import { ProductCard } from './ProductCard';

export default {
  title: 'Components/Commerce/ProductCard',
  component: ProductCard
};

const storyProps = {
  currency: 'GBP',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  hasAddToCart: true,
  hasRating: true,
  id: 'Product id',
  img: {
    src: '/static/commerce/tripod.jpg',
    alt: 'Tripod'
  },
  linkTag: 'a',
  name: 'Product A',
  onAddToCart: () => {},
  onFavourite: () => {},
  price: {
    list: {
      currency: 'GBP',
      value: '13000'
    },
    offer: {
      currency: 'GBP',
      value: '11000'
    }
  },
  rating: '90',
  reviewTotal: '250',
  routeName: '#',
  monthlyPrice: '1000',
  subscriptionCost: {
    currency: 'GBP',
    price: '100',
    rate: 'per month'
  }
};

export const normal = args => (
  <div style={{ maxWidth: '23rem' }}>
    <ProductCard {...args} />
  </div>
);
normal.args = storyProps;

const storyB2c = {
  currency: 'GBP',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  hasAddToCart: true,
  hasRating: true,
  id: 'Product id',
  img: {
    src: '/static/commerce/tripod.jpg',
    alt: 'Tripod'
  },
  linkTag: 'a',
  name: 'Product B',
  onAddToCart: () => {},
  onFavourite: () => {},
  price: {
    list: {
      currency: 'GBP',
      value: '13000'
    }
  },
  routeName: '#'
};

export const B2C = args => (
  <div style={{ maxWidth: '23rem' }}>
    <ProductCard {...args} />
  </div>
);
B2C.args = storyB2c;

const storyAutomotive = {
  currency: 'GBP',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt amet',
  id: 'automotive',
  img: {
    src: '/static/commerce/tripod.jpg',
    alt: 'Tripod'
  },
  name: 'Product C',
  price: {
    list: {
      currency: 'GBP',
      value: '13000'
    }
  },
  pricePrefix: 'From ',
  routeName: '#',
  monthlyPrice: '1000',
  hasCartIcon: true,
  subscriptionCost: {
    prefix: 'From ',
    currency: 'GBP',
    price: '100',
    rate: 'per month'
  }
};

export const Automotive = args => (
  <div style={{ maxWidth: '23rem' }}>
    <ProductCard {...args} />
  </div>
);
Automotive.args = storyAutomotive;

const withAvailabilityProps = {
  currency: 'GBP',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  hasAddToCart: true,
  hasRating: true,
  id: 'Product id',
  img: {
    src: '/static/commerce/tripod.jpg',
    alt: 'Tripod'
  },
  linkTag: 'a',
  name: 'Product B',
  onAddToCart: () => {},
  onFavourite: () => {},
  price: {
    list: {
      currency: 'GBP',
      value: '13000'
    }
  },
  routeName: '#',
  availability: [
    { id: '1', status: 'available', label: 'Online' },
    { id: '2', status: 'low', label: 'Croydon Store' },
    { id: '3', status: 'unavailable', label: 'Wembley Store' },
    { id: '4', status: 'unknown', label: 'Greenwich Store' },
    { id: '5', status: 'none', label: <Link href="#">Select store...</Link> }
  ]
};

export const availability = args => (
  <div style={{ maxWidth: '23rem' }}>
    <ProductCard {...args} />
  </div>
);
availability.args = withAvailabilityProps;
