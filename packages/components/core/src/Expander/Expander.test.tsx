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
import { axe } from 'jest-axe';
import { Expander } from './Expander';

const testProps1 = {
  label: 'This is  a test',
  children: <li>Test content</li>
};

describe('<Expander /> component', () => {
  it('expands on heading click', () => {
    const { getByTestId, getByText } = render(<Expander {...testProps1} />);
    fireEvent.click(getByTestId('OpenMenu'));
    expect(getByText('Test content')).toBeDefined();
  });
  test('its snapshot matches', () => {
    const { container } = render(<Expander {...testProps1} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<Expander {...testProps1} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
