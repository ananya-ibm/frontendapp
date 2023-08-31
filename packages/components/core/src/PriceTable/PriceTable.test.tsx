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
import { PriceTable } from './PriceTable';

const testProps = {
  priceBreakdown: [
    {
      text: 'Base Price',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: '500'
      },
      helpText: 'Helpful info about Base Price'
    },
    {
      text: 'Exterior Additions',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: '300'
      }
    },
    {
      text: 'Interior Additions',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: '50000'
      }
    },
    {
      text: 'Total cost',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: '35500'
      }
    }
  ]
};

describe('<PriceTable /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<PriceTable {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<PriceTable {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
