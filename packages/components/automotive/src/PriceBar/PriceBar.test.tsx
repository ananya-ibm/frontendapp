/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { PriceBar } from './PriceBar';

const testProps = {
  addToCartText: 'Add to cart',
  addToCartUrl: '#',
  financeLinkText: 'Customize Finance',
  financeUrl: '#',
  testDriveText: 'Book test drive',
  testDriveUrl: '#',
  price: {
    value: '25000',
    currency: 'GBP',
    prefix: 'From'
  },
  subscriptionCost: {
    value: '800',
    currency: 'GBP',
    prefix: '',
    rate: '/month'
  }
};

describe('<PriceBar /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<PriceBar {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
