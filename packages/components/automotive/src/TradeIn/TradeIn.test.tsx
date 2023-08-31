/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { screen, fireEvent } from '@testing-library/react';
import { TradeIn } from './TradeIn';

const editTradeInTestProps = {
  onClickTradein: jest.fn(),
  onClickTerms: jest.fn(),
  registrationNumber: 'BD51 SMR',
  estimatedValue: {
    value: '25000',
    currency: 'GBP',
    prefix: '+'
  },
  addTradeIn: {},
  text: 'You added a car'
};

const addTradeInTestProps = {
  onClickTerms: jest.fn(),
  addTradeIn: {
    text: 'Add trade in',
    onClick: jest.fn()
  }
};

describe('<TradeIn /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<TradeIn {...editTradeInTestProps} />);
    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Given tradeIn props it shows trade in components', () => {
    render(<TradeIn {...addTradeInTestProps} />);

    const tradeInButton = screen.getByTestId('add-trade-in');
    expect(tradeInButton).toBeDefined();
  });

  test('Given editTradeIn props it shows trade in components', () => {
    render(<TradeIn {...editTradeInTestProps} />);

    const estimatedValue = screen.getByTestId('estimated-value');
    expect(estimatedValue).toBeDefined();

    const registratationNumber = screen.getByTestId('registration-number');
    expect(registratationNumber).toBeDefined();
  });

  it('calls "onClick" prop on Edit Button click', () => {
    const onClick = jest.fn();
    const { getByText } = render(<TradeIn {...editTradeInTestProps} onClickTradeIn={onClick} />);
    fireEvent.click(getByText('Edit Trade-in'));
    expect(onClick).toHaveBeenCalled();
  });
});
