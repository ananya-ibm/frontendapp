/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { TradeInConfirmation } from './TradeInConfirmation';

const testProps = {
  valuation: {
    condition: 'GOOD',
    id: 'ceb0085627ea91fe2850b6377dc0c4e3',
    make: 'DeLorean',
    mileage: '20000',
    model: 'Time Machine',
    registration: 'ABC123',
    value: { value: '10000', currency: 'GBP' },
    oneMonthValue: { value: '8000', currency: 'GBP' },
    twoMonthValue: { value: '60000', currency: 'GBP' },
    year: '1980'
  },
  onRemoveClick: () => {},
  onAcceptClick: () => {},
  date: new Date('December 25, 2019')
};

describe('<TradeInConfirmation /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<TradeInConfirmation {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
