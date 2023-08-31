/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { ASpot } from './ASpot';

const testProps = {
  image: 'https://picsum.photos/1500/700',
  title: 'Heading Text',
  isFixed: true,
  subtitle: 'We got your back!',
  buttonLabel: 'Explore More',
  onClick: () => {}
};

describe('<ASpot /> component', () => {
  test('A-Spot renders correctly', () => {
    const { container } = render(<ASpot {...testProps} />);
    expect(container).toBeDefined();
  });

  test('its snapshot matches', () => {
    const { container } = render(<ASpot {...testProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
