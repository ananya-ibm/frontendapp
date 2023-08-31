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
import { DetailsGrid } from './DetailsGrid';

const testProps = {
  details: [
    { title: 'test', value: 'test' },
    { title: 'test2', value: 'test' },
    { title: 'test3', value: 'test' },
    { title: 'test4', value: 'test' },
    { title: 'test5', value: 'test' }
  ]
};

describe('<DetailsGrid /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<DetailsGrid {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<DetailsGrid {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
