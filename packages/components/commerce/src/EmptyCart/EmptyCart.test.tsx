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
import { EmptyCart } from './EmptyCart';

const testProps = {
  primaryUrl: '#',
  secondayUrl: '#',
  primaryText: 'Primary button text',
  secondaryTest: 'Secondary button text'
};

describe('<EmptyCart /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<EmptyCart {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<EmptyCart {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
