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
import { OrderSummary } from './OrderSummary';

const testProps = {
  subTotalPrice: {
    value: '59.99',
    currency: 'USD',
    format: 'en-US'
  },
  totalItems: 3,
  discountPrice: {
    prefix: '-',
    value: '10.99',
    currency: 'USD',
    format: 'en-US'
  },
  shippingCharge: {
    value: '5.50',
    currency: 'USD',
    format: 'en-US'
  },
  taxCharges: {
    value: '2.80',
    currency: 'USD',
    format: 'en-US'
  },
  totalDays: 2,
  orderTotalPrice: {
    value: '57.30',
    currency: 'USD',
    format: 'en-US'
  }
};

describe('<OrderSummary /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<OrderSummary {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<OrderSummary {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
