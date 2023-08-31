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
import { Stars } from './Stars';

const testProps = {
  reviews: 309,
  totalStars: 5,
  rating: 60
};

describe('<Stars /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<Stars {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<Stars {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
