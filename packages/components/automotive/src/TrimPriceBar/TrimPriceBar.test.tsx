/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { fireEvent } from '@testing-library/react';
import { TrimPriceBar } from './TrimPriceBar';

const testProps = {
  handleConfigure: () => {},
  updateTrim: jest.fn(),
  product: {
    children: [
      {
        name: 'Car Trim 1',
        price: {
          value: '35000',
          currency: 'GBP',
          rate: 'Purchase Price'
        },
        subscriptionCost: {
          value: '800',
          currency: 'GBP',
          rate: '/m'
        }
      },
      {
        name: 'Car Trim 2',
        price: {
          value: '35000',
          currency: 'GBP',
          rate: 'Purchase Price'
        },
        subscriptionCost: {
          value: '1000',
          currency: 'GBP',
          rate: '/m'
        }
      },
      {
        name: 'Car Trim 3',
        price: {
          value: '45000',
          currency: 'GBP',
          rate: 'Purchase Price'
        },
        subscriptionCost: {
          value: '1200',
          currency: 'GBP',
          rate: '/m'
        }
      },
      {
        name: 'Car Trim 4',
        price: {
          value: '55000',
          currency: 'GBP',
          rate: 'Purchase Price'
        },
        subscriptionCost: {
          value: '1400',
          currency: 'GBP',
          rate: '/m'
        }
      }
    ]
  }
};

describe('<TrimPriceBar /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<TrimPriceBar {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('clicking a tab calls updateTrim', () => {
    window.HTMLElement.prototype.scrollIntoView = () => {};

    const { getByText } = render(<TrimPriceBar {...testProps} />);

    fireEvent.click(getByText('Car Trim 2'));
    expect(testProps.updateTrim).toHaveBeenCalled();
  });
});
