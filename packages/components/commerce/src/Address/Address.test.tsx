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
import { Address } from './Address';

const testProps = {
  title: 'Address Test',
  address: {
    title: 'test',
    firstName: 'test',
    lastName: 'test',
    address1: 'test',
    address2: 'test',
    city: 'test',
    province: 'test',
    county: 'test',
    country: 'test',
    zip: 'test'
  }
};

describe('<Address /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<Address {...testProps} />);
    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<Address {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
