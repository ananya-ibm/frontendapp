/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render, mockDate, RealDate } from '@testUtils';
import { fireEvent, screen } from '@testing-library/react';
import { SavedConfiguration } from './SavedConfiguration';

afterEach(() => {
  global.Date = RealDate;
});

beforeEach(() => {
  mockDate(new Date('2020-07-14T11:01:58.135Z'));
});

const testProps = {
  onDelete: () => {},
  onCartAdd: () => {},
  configuration: {
    description: 'DeLorean description',
    id: '12345678',
    image: '/static/automotive/exterior.png',
    amount: {
      value: 500,
      currency: 'GBP'
    },
    productId: 'DMCDeLorean'
  }
};

describe('<SavedConfiguration /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<SavedConfiguration {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls "onCartAdd" prop on Add to cart button click', () => {
    const onClick = jest.fn();
    render(<SavedConfiguration {...testProps} onCartAdd={onClick} />);
    fireEvent.click(screen.getByText('Add to cart'));
    expect(onClick).toHaveBeenCalled();
  });

  test('calls "onDelete" prop on Delete button click', () => {
    const onClick = jest.fn();
    render(<SavedConfiguration {...testProps} onDelete={onClick} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onClick).toHaveBeenCalled();
  });
});
