/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { FinanceContract } from './FinanceContract';

const testProps = {
  selectedFinanceOption: 'Personal Contract Purchase',
  monthlyPrice: {
    currency: 'GBP',
    value: 1200
  },
  termsLink: '#',
  priceBreakdown: [
    {
      text: 'Listing Price',
      helpText: 'The listing price',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    },
    {
      text: 'Duration',
      value: '12months',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    },
    {
      text: 'Deposit',
      amount: {
        currency: 'GBP',
        value: 5000
      }
    },
    {
      text: 'Optional final payment',
      amount: {
        currency: 'GBP',
        value: 5000
      }
    },
    {
      text: 'APR',
      helpText: 'annual percentage rate',
      value: '2.1% APR',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    },
    {
      text: 'Fixed Rate of Interest',
      value: '2.1% p.a.',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    },
    {
      text: 'Cost of credit',
      amount: {
        currency: 'GBP',
        value: 100
      }
    }
  ]
};

describe('<FinanceContract /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<FinanceContract {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
