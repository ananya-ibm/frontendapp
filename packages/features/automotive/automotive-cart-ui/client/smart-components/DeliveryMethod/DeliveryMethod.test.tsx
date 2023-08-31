/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme } from '@testUtils';
import DeliveryMethod from './DeliveryMethod';

const testProps = {
  onBackClick: jest.fn(),
  onNextClick: jest.fn(),
  cartId: '123'
};

window.scrollTo = jest.fn();

describe('<DeliveryMethod /> component', () => {
  test('its snapshot matches', () => {
    const { container } = renderWithTheme(<DeliveryMethod {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
