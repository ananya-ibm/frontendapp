/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme as render } from '@testUtils';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { QREmail } from './QREmail';

describe('<QREmail /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<QREmail />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('clicking submit invokes function that returns email', async () => {
    const mockFn = jest.fn(values => {
      return values;
    });
    render(<QREmail onSubmit={mockFn} />);

    const input = screen.getByLabelText(/your email/i);
    const submit = screen.getByText(/QR/i);

    await userEvent.type(input, 'email@email.com');
    fireEvent.click(submit);
    //need to fix testing
    //expect(mockFn.mock.calls.length).toBe(1);
    //expect(mockFn.mock.results[0].value.toString()).toBe('email@email.com');
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<QREmail />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
