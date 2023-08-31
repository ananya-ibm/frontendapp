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
import { CategoryCard } from './CategoryCard';

const testProps = {
  title: 'Lorem ipsum dolor sit amet',
  price: {
    currency: 'GBP',
    value: '20000',
    prefix: ''
  },
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
  img: {
    src: '/static/automotive/products/thumbnails/X34Landspeeder.png',
    alt: 'X34Landspeeder'
  },
  primaryBtnText: 'Discover the model',
  secondaryBtnText: 'Download brochure',
  onPrimaryBtnClick: () => {},
  onSecondaryBtnClick: () => {},
  isImageRight: false
};

describe('<CategoryCard /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<CategoryCard {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<CategoryCard {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
