/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ProductBrowseCarousel } from './ProductBrowseCarousel';

const testProps = {
  title: 'A vehicle for any superhero',
  description: 'See our full range of vehicles and find the one that best fits your lifestyle',
  productRangeLink: '/catalog/category/Vehicles',
  items: [
    {
      id: 1,
      image: '/static/automotive/products/thumbnails/interceptor.png',
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
      image: '/static/automotive/products/thumbnails/grantorino.png',
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
      image: '/static/automotive/products/thumbnails/OriginalBatMobile.png',
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
    }
  ]
};

describe('<ProductBrowseCarousel /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ProductBrowseCarousel {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('clicking on the expand button in the carousel expands details for carousel', async () => {
    render(<ProductBrowseCarousel {...testProps} />);
    const expandButton = screen.getByText(/see more/i);

    user.click(expandButton);

    expect(expandButton).toHaveTextContent('See Less');
  });

  test('clicking on the next slide arrow to show next car until he sees first car', async () => {
    render(<ProductBrowseCarousel {...testProps} />);

    const expandButton = screen.getByText(/see more/i);

    user.click(expandButton);

    const nextButton = screen.getByTestId('next-slide');

    user.click(nextButton);
    user.click(nextButton);
    user.click(nextButton);
    user.click(nextButton);

    expect(nextButton).toHaveFocus();
  });

  test('clicking on the previous slide arrow to show previous car until he sees the last car', async () => {
    render(<ProductBrowseCarousel {...testProps} />);

    const expandButton = screen.getByText(/see more/i);

    user.click(expandButton);

    const prevButton = screen.getByTestId('prev-slide');

    user.click(prevButton);
    user.click(prevButton);

    expect(prevButton).toHaveFocus();
  });

  test('Set your budget link - Anchor', async () => {
    render(<ProductBrowseCarousel {...testProps} />);
    const setBudget = screen.getByTestId('set-budget-link');

    expect(setBudget).toBeDefined();
    user.click(setBudget);
  });
});
