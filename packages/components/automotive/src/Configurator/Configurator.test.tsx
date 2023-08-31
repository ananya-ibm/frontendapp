/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Configurator } from './Configurator';
import { ProductsGrid } from './ProductsGrid';

const testProps = {
  onBackButtonClick: () => {},
  categories: [
    {
      id: 'exterior',
      name: 'Exterior',
      title: 'Customise your Exterior',
      image: '/exterior.png',
      subcategories: [
        {
          id: 'color',
          title: 'Choose a color',
          name: 'Color',
          products: [
            {
              name: 'Yellow',
              id: 'yellow',
              thumbnail: '/automotive/thumbnails/Yellow-Car.png',
              price: {
                prefix: '+',
                currency: 'GBP',
                value: '500'
              }
            },
            {
              name: 'Blue',
              id: 'blue',
              thumbnail: '/automotive/thumbnails/Nicer-Blue.png',
              price: {
                prefix: '+',
                currency: 'GBP',
                value: '500'
              }
            },
            {
              name: 'Shiny Black',
              id: 'black',
              thumbnail: '/automotive/thumbnails/Shiny-Black.png'
            },
            {
              name: 'Cream',
              id: 'cream',
              thumbnail: '/automotive/thumbnails/Soft-Cream-Wheel.png'
            }
          ]
        },
        {
          id: 'wheels',
          title: 'Wheels',
          name: 'Wheels',
          products: [
            {
              name: 'Big',
              id: 'big',
              thumbnail: '/automotive/thumbnails/Nicer-Blue.png',
              price: {
                prefix: '+',
                currency: 'GBP',
                value: '500'
              }
            },
            {
              name: 'Small',
              id: 'small',
              thumbnail: '/automotive/thumbnails/Nicer-Blue.png'
            }
          ]
        }
      ]
    },
    {
      id: 'interior',
      name: 'Interior',
      title: 'Customise your interior',
      image: '/interior.png',
      subcategories: [
        {
          id: 'seat-material',
          title: 'Seat material',
          url: '#',
          name: 'seat-material',
          products: [
            {
              name: 'leather',
              id: 'leather',
              thumbnail: '/automotive/thumbnails/Wafer-white-seat.png'
            },
            {
              name: 'velvet',
              id: 'velvet',
              thumbnail: '/automotive/thumbnails/Nice-Pattern-seat.png'
            }
          ]
        }
      ]
    },
    {
      id: 'extras',
      name: 'Extras',
      title: 'Add your optional extras',
      subcategories: [
        {
          id: 'packages',
          title: 'Packages',
          url: '#',
          name: 'packages',
          products: [
            {
              name: 'Charging',
              id: 'charging',
              thumbnail: '/automotive/thumbnails/Time-Travel-GPS.png'
            },
            {
              name: 'Subscription',
              id: 'subscription',
              thumbnail: '/automotive/thumbnails/Time-Travel-GPS.png'
            }
          ]
        },
        {
          id: 'accessories',
          title: 'Accessories',
          url: '#',
          name: 'accessories',
          products: [
            {
              name: 'Flux capacator',
              id: 'flux-capacator',
              thumbnail: '/automotive/thumbnails/Time-Travel-GPS.png'
            },
            {
              name: 'Lightning rod',
              id: 'lightning-rod',
              thumbnail: '/automotive/thumbnails/Time-Travel-GPS.png'
            }
          ]
        }
      ]
    }
  ],
  configuratorSummary: {
    summaryText:
      'The original DMC Delorean from the Back to the Future franchise, with the real ability to travel in time and Michael J Fox’s phone number included.',
    configurationCode: 'waitaminutedoc',
    deliveryDate: 'June 2021',
    priceBreakdownText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    priceBreakdown: [
      {
        text: 'Base Price',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 500
        }
      },
      {
        text: 'Exterior Additions',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 300
        }
      },
      {
        text: 'Interior Additions',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 50000
        }
      },
      {
        text: 'Other Stuff',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 300
        }
      },
      {
        text: 'Total cost',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 35500
        }
      }
    ],
    onSaveConfiguration: () => {},
    onDeleteConfiguration: () => {},
    summarySelections: [
      {
        title: 'Your chosen exterior',
        options: [
          {
            title: 'Colour',
            text: 'Blue',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Nicer-Blue.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Wheels',
            text: 'Big',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Shiny-Black.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          }
        ]
      },
      {
        title: 'Your chosen interior',
        options: [
          {
            title: 'Seat 1',
            text: 'Leather',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Leather-Seat.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Seat 2',
            text: 'Texture',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Waffle-Seat.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Tyre',
            text: 'Round',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 200
            },
            version: 'R16 Hot Wheel',
            thumbnail: '/static/automotive/thumbnails/Forest-Green-Wheel.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          }
        ]
      },
      {
        title: 'Your chosen optionals',
        options: [
          {
            title: 'package',
            text: 'Winter Package',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Time-Travel-GPS.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Colour',
            text: 'Yellow',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/yellow.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          }
        ]
      }
    ]
  },
  priceBar: {
    addToCartText: 'add to cart',
    addToCartUrl: '#',
    financeLinkText: 'Calculate Finance',
    financeUrl: '#',
    price: {
      value: '25000',
      currency: 'GBP',
      prefix: ''
    },
    subscriptionCost: {
      value: '800',
      currency: 'GBP',
      rate: '/month'
    },
    testDriveText: 'book test drive',
    testDriveUrl: '#'
  }
};

jest.mock('@exo/frontend-features-events-logic', () => ({
  useEventContext: () => ({
    createEvent: () => {}
  })
}));

describe('<Configurator /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<Configurator {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('clicking on a category, renders its subcategory', async () => {
    const { findByText } = render(<Configurator {...testProps} />);
    const navLink = screen.getByText(/interior/i);
    user.click(navLink);

    await waitFor(() => screen.getByText('Customise your interior'));

    const items = await findByText('Seat material');
    expect(items).toHaveTextContent('Seat material');
  });

  test('clicking on a subcat with another subcat will render that subcat list', async () => {
    const { findByText } = render(<Configurator {...testProps} />);
    const navLink = screen.getByText(/interior/i);
    user.click(navLink);

    await waitFor(() => screen.getByText('Customise your interior'));

    const subcat = await findByText('Seat material');

    user.click(subcat);

    await waitFor(() => screen.getByText('Seat material'));

    const products = await findByText(/leather/i);
    expect(products).toHaveTextContent('leather');
  });

  test('clicking on the expand button in the pricebar, expands the summary', async () => {
    render(<Configurator {...testProps} />);
    const expandButton = screen.getByText(/see more/i);

    user.click(expandButton);

    await waitFor(() => screen.getByText('Your new car'));

    expect(expandButton).toHaveTextContent('See Less');
  });

  const productsGridProps = {
    products: [
      {
        name: 'Yellow',
        id: 'yellow',
        thumbnail: '/automotive/thumbnails/Yellow-Car.png',
        price: {
          prefix: '+',
          currency: 'GBP',
          value: '500'
        }
      },
      {
        name: 'Blue',
        id: 'blue',
        thumbnail: '/automotive/thumbnails/Nicer-Blue.png',
        price: {
          prefix: '+',
          currency: 'GBP',
          value: '500'
        }
      },
      {
        name: 'Shiny Black',
        id: 'black',
        thumbnail: '/automotive/thumbnails/Shiny-Black.png'
      },
      {
        name: 'Cream',
        id: 'cream',
        thumbnail: '/automotive/thumbnails/Soft-Cream-Wheel.png'
      }
    ],
    handleProductClick: () => {},
    isExpanded: true
  };

  // Skipping since latest version of react testing library doesn't support element with pointer events none click
  test.skip('clicking on a product, returns the product details', () => {
    const mockFn = jest.fn(product => product.id);
    render(<ProductsGrid {...productsGridProps} handleProductClick={mockFn} />);
    const product = screen.getByText(/yellow/i);
    user.click(product);

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.results[0].value).toBe('yellow');
  });

  test('ProductGrid snapshot matches', () => {
    const { container } = render(<ProductsGrid {...productsGridProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
