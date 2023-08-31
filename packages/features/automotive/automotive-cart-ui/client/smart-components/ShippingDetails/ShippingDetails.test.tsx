/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { renderWithTheme} from '@testUtils';
import ShippingDetails from './ShippingDetails';

window.scrollTo = jest.fn();
jest.mock('@exo/frontend-features-automotive-cart-automotive-logic', () => ({
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
    }))
}));

jest.mock('@exo/frontend-features-account-profile-logic', () => ({
  useMe: jest.fn(() => ({
      data: jest.fn(() => {
          return new Promise(resolve => {
              resolve({
                  data: {
                      me: {
                        defaultAddress: '123123'
                      }
                  }
              });
          });
      })
  }))
}));

const testProps = {
    onBackClick: jest.fn(),
    onNextClick: jest.fn(),
    cartId: '123'
};

describe('<ShippingDetails /> component', () => {
    const historyMock: any = {
        push: jest.fn(),
        location: jest.fn(),
        listen: jest.fn()
    };

    // @ts-ignore
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({})
        })
    );

    test('its snapshot matches', async () => {
        let container;
        await act(async () => {
            // eslint-disable-next-line prefer-destructuring
            container = renderWithTheme(
                <Router history={historyMock}>
                  <ShippingDetails {...testProps} />
                </Router>
            ).container;
        });

        expect(container).toBeDefined();
        expect(container.firstChild).toMatchSnapshot();
    });
});