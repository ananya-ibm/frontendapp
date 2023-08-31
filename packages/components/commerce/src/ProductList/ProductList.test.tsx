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
import { ProductList } from './ProductList';

const testProps = {
  products: [
    {
      id: 'Reading Tablet',
      name: 'Reading Tablet',
      price: {
        list: {
          value: '375.00',
          currency: 'GBP'
        }
      },
      currency: 'GBP',
      img: {
        src: 'https://i.ytimg.com/vi/N1e_voQvHYk/maxresdefault.jpg',
        alt: 'This is a Product'
      }
    },
    {
      id: 'Kitchen Tablet',
      name: 'Kitchen Tablet',
      price: {
        list: {
          value: '390.00',
          currency: 'GBP'
        }
      },
      currency: 'GBP',
      img: {
        src: 'https://i.ytimg.com/vi/N1e_voQvHYk/maxresdefault.jpg',
        alt: 'This is a Product'
      }
    },
    {
      id: 'Protable Tablet',
      name: 'Protable Tablet',
      price: {
        list: {
          value: '475.00',
          currency: 'GBP'
        }
      },
      currency: 'GBP',
      img: {
        src: 'https://i.ytimg.com/vi/N1e_voQvHYk/maxresdefault.jpg',
        alt: 'This is a Product'
      }
    },
    {
      id: 'Budget Tablet',
      name: 'Budget Tablet',
      price: {
        list: {
          value: '300.00',
          currency: 'GBP'
        }
      },
      currency: 'GBP',
      img: {
        src: 'https://i.ytimg.com/vi/N1e_voQvHYk/maxresdefault.jpg',
        alt: 'This is a Product'
      }
    }
  ]
};

describe('<ProductList /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ProductList {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<ProductList {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
