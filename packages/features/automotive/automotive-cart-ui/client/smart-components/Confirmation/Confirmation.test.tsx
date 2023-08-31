/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme } from '@testUtils';
import Confirmation from './Confirmation';

window.scrollTo = jest.fn();

jest.mock('@exo/frontend-features-automotive-cart-automotive-logic', () => ({
  useCarts: jest.fn(() => ({
    getCarts: jest.fn(() => ({
      data: { me: { carts: [{}] } },
      error: false,
      loading: true
    })),
    deleteCart: jest.fn()
  }))
}));

describe('<Confirmation /> component', () => {
  test('its snapshot matches', () => {
    const { container } = renderWithTheme(<Confirmation />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
