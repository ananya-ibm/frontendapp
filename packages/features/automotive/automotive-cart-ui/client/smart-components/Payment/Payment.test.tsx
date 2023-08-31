/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme } from '@testUtils';
import Payment from './Payment';

jest.mock('@exo/frontend-common-session-context', () => ({
  useSessionContext: () => ({
    cartId: 'xxx',
    financeOption: 'xxx',
    tradeInId: 'xxx'
  })
}));

jest.mock('@exo/frontend-features-automotive-cart-automotive-logic', () => ({
  useTradeIn: jest.fn(() => ({
    addTradeIn: jest.fn(),
    getTradeIn: jest.fn(() => ({
      data: {},
      loading: false,
      error: null
    }))
  })),
  useFinance: jest.fn(() => ({
    create: jest.fn(() => ({
      financeData: {},
      isLoading: false,
      hasError: false
    })),
    createPcp: jest.fn(),
    getPcp: jest.fn(() => ({
      data: {},
      loading: false,
      error: null
    }))
  })),
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
  useCart: jest.fn(() => ({
    data: {},
    loading: false,
    error: null
  })),
  useCheckout: jest.fn(() => ({
    updateShipping: jest.fn(),
    updateBilling: jest.fn(() => {
      return new Promise(resolve => {
        resolve('xxx');
      });
    }),
    checkout: jest.fn(() => {
      return new Promise(resolve => {
        resolve({ data: { checkout: 'xxx' } });
      });
    }),
    loading: false,
    error: null
  })),
  usePayment: jest.fn(() => ({
    initiatePayment: jest.fn(() => {
      return new Promise(resolve => {
        resolve({ data: { initiatePayment: 'xxx' } });
      });
    }),
    loading: false,
    error: null
  }))
}));

const testProps = {
  onBackClick: jest.fn(),
  onNextClick: jest.fn()
};

window.scrollTo = jest.fn();

describe('<Payment /> component', () => {
  test('its snapshot matches', () => {
    const { container } = renderWithTheme(<Payment {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correct content for Cash payment', () => {
    const { queryByText } = renderWithTheme(<Payment {...testProps} />);

    expect(queryByText('Purchase your vehicle now')).toBeInTheDocument();
  });

  test.skip('renders correct content for PCP payment', () => {
    const { queryByText } = renderWithTheme(<Payment {...testProps} />);

    expect(queryByText('Reserve your vehicle with your depsoit now')).toBeInTheDocument();
  });
});
