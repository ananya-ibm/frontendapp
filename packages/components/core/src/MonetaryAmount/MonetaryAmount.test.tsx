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
import { MonetaryAmount } from './MonetaryAmount';

const testProps = {
  prefix: 'From ',
  value: '10.03',
  rate: 'per month'
};

describe('<MonetaryAmount /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<MonetaryAmount {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('it passes an axe accesibility check', async () => {
    const { container } = render(<MonetaryAmount {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  const testPropsUSD = {
    value: '10000',
    currency: 'USD',
    format: 'en-US'
  };
  test('its USD snapshot matches', () => {
    const { container } = render(<MonetaryAmount {...testPropsUSD} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  const testPropsEU = {
    value: '10.00',
    currency: 'EUR',
    format: 'de-DE'
  };
  test.skip('its EU snapshot matches', () => {
    const { container } = render(<MonetaryAmount {...testPropsEU} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
