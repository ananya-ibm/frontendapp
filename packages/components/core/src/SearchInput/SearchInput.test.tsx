/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { SearchInput } from './SearchInput';

describe('<SearchInput /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<SearchInput onSearch={() => {}} />);
    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('user can enter a search term', async () => {
    render(<SearchInput onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Placeholder Text');
    user.type(input, '123');
    expect(input).toHaveValue('123');
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<SearchInput onSearch={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
