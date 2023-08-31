/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { renderWithTheme } from '@testUtils';
import CheckoutStoreLocator from './CheckoutStoreLocator';

jest.mock('@exo/frontend-features-automotive-cart-automotive-logic', () => ({
  useCarts: jest.fn(() => ({
    deleteCart: jest.fn(),
    getCarts: jest.fn(() => ({
      data: {
        me: {
          carts: [
            {
              id: '00000334',
              guid: '70f29604-8fcc-4276-91ca-4d6dc16f926f',
              totalSalesTax: {
                value: '79999',
                currency: 'GBP'
              },
              grandTotal: {
                value: '79999',
                currency: 'GBP'
              },
              lineItems: [
                {
                  product: {
                    name: 'DeLorean Time Machine',
                    id: 'DeLoreanTimeMachine_1',
                    description:
                      '1.21 GW coupe 2 door 2 seats nuclear 5-speed manual 3-speed automatic 2900 hp',
                    longDescription:
                      'From 0 to 88mph in a few seconds, the DeLorean is ready to take you on the ultimate journey through time. Our uniquely engineered engines enable you to travel faster than the speed of light.',
                    thumbnail:
                      '/static/images/products/configurator/thumbnails/DeLoreanTimeMachine_1.png',
                    price: {
                      list: {
                        value: '79999',
                        currency: 'GBP'
                      }
                    },
                    parentCategory: {
                      name: 'Derivative',
                      id: 'Derivative',
                      parentCategory: null
                    }
                  }
                },
                {
                  product: {
                    name: 'Standard Alloys',
                    id: 'Standard_Alloys',
                    description: null,
                    longDescription: null,
                    thumbnail:
                      '/static/images/products/configurator/thumbnails/Standard_Alloys.png',
                    price: {
                      list: {
                        value: '0',
                        currency: 'GBP'
                      }
                    },
                    parentCategory: {
                      name: 'Alloys',
                      id: 'Alloys',
                      parentCategory: {
                        name: 'Exterior',
                        id: 'Exterior'
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      loading: false,
      error: null
    }))
  })),
  useAvailability: jest.fn(() => ({ data: null, loading: false }))
}));

jest.mock('@exo/frontend-common-app-shell');
jest.mock('@exo/frontend-common-session-context');

beforeEach(() => {
  // @ts-ignore
  useSessionContext.mockImplementation(() => ({}));
});

describe('<CheckoutStoreLocator /> component', () => {
  test('its snapshot matches', () => {
    const { container } = renderWithTheme(<CheckoutStoreLocator />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('it has a store displayed by default if  previously in session context', () => {
    // @ts-ignore
    useSessionContext.mockImplementation(() => ({
      storeId: 'storeId',
      storeName: 'A Store'
    }));

    const { container } = renderWithTheme(<CheckoutStoreLocator />);

    expect(container).toHaveTextContent('A Store');
  });
});
