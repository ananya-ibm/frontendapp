/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FavoriteButton } from './FavoriteButton';

const mockOnChange = jest.fn();

const testProps = {
  id: 'test',
  onChange: mockOnChange
};

describe('<FavoriteButton /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<FavoriteButton {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('clicking the button returns the id of the product', () => {
    render(<FavoriteButton {...testProps} />);
    const favButton = screen.getByTestId('FavoriteBtnTestId');

    fireEvent.click(favButton);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  test('it passes an axe accesibility check', async () => {
    const { container } = render(<FavoriteButton {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
