/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { screen } from '@testing-library/react';

import user from '@testing-library/user-event';
import { renderWithTheme as render } from '@testUtils';
import { axe } from 'jest-axe';
import { Product } from './Product';

const testProps = {
  addToBasketHandler: () => {},
  id: '572461',
  partnumber: '572461',
  name: 'GR-80TP Extension Battery Grip/Tripod',
  longDescription: 'GR-80TP Extension Battery Grip/Tripod for EOS Rebel G.',
  description: 'GR-80TP Extension Battery Grip/Tripod',
  fullImage: 'https://images.unsplash.com/photo-1534949119444-a092348af7dc',
  type: 'bundleProduct',
  price: {
    list: {
      value: '48.65',
      currency: 'GBP'
    }
  }
};

describe('<Product /> component', () => {
  test('Product with type sku does not render number input', () => {
    const { container } = render(<Product {...testProps} type="sku" />);
    expect(container).toBeDefined();
  });

  test('Product with type baseProduct does not render number input', () => {
    const { container } = render(<Product {...testProps} type="baseProduct" />);
    expect(container).toBeDefined();
  });

  test('Clicking add to basket fires handler', () => {
    const mockFn = jest.fn(variables => variables);
    render(<Product {...testProps} addToBasketHandler={mockFn} type="baseProduct" />);
    const button = screen.getByText(/add to basket/i);
    user.click(button);
    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.results[0].value).toMatchObject({
      variables: { productId: '572461', quantity: 1 }
    });
  });

  test('its snapshot matches', () => {
    const { container } = render(<Product {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('it passes an axe accesibility check', async () => {
    const { container } = render(<Product {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
