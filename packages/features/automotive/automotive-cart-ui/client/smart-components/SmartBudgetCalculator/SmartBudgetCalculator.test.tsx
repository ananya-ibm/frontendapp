/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { act } from 'react-dom/test-utils';
import { SmartBudgetCalculator } from './SmartBudgetCalculator';

jest.mock('@exo/frontend-features-automotive-cart-automotive-logic', () => ({
  useBudgetModification: jest.fn(() => ({
    update: jest.fn(),
    create: jest.fn()
  })),
  useCart: jest.fn(() => ({
    data: {},
    loading: false,
    error: null
  }))
}));

jest.mock('@exo/frontend-common-session-context', () => ({
  useSessionContext: () => ({ budget: {}, type: 'xx' })
}));

describe('<SmartBudgetCalculator /> component', () => {
  test('its snapshot matches', async () => {
    let container;
    await act(async () => {
      // eslint-disable-next-line prefer-destructuring
      container = render(<SmartBudgetCalculator />).container;
    });
    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
