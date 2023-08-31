/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { axe } from 'jest-axe';
import { ProductCard } from './ProductCard';

const testProps = {
  currency: 'GBP',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  hasAddToCart: true,
  id: 'Product id',
  img: {
    src: 'img.jpg',
    alt: 'Tripod'
  },
  // linkTag: 'a',
  monthlyPrice: '500',
  name: 'Product A',
  onAddToCart: () => {},
  onFavourite: () => {},
  price: {
    list: {
      value: '13000',
      currency: 'GBP'
    }
  },
  routeName: '/product/',
  subscriptionCost: {
    currency: 'GBP',
    price: '100',
    rate: 'per month'
  },
  availability: [
    { id: '1', status: 'available' as 'available', label: 'Online' },
    { id: '2', status: 'low' as 'low', label: 'Croydon Store' },
    { id: '3', status: 'unavailable' as 'unavailable', label: 'Wembley Store' },
    { id: '4', status: 'unknown' as 'unknown', label: 'Greenwich Store' }
  ]
};

describe('<ProductCard /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ProductCard {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<ProductCard {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
