/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { Tile } from './Tile';

const testProps = {
  description: 'Porem ipsum dolor sit amet consectetur adipiscing elit',
  id: 'yellowcar',
  price: {
    currency: 'GBP',
    value: '10'
  },
  title: 'Yellow',
  image: '/yellow.png',
  isSmall: true
};

describe('<Tile /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<Tile {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
