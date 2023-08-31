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
import { Hero } from './Hero';

const testProps = {
  image:
    'https://rattanconsulting.com/wp/wp-content/uploads/2016/12/Light-Gray-polygon-IBM-Background-8.png',
  title: 'A Commerce Demo Store',
  subtitle: 'IBM iX',
  text: 'Check out our latest products!',
  buttonText: 'Shop'
};

describe('<Hero /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<Hero {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<Hero {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
