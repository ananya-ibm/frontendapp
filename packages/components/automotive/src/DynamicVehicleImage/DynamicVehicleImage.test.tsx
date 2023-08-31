/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { DynamicVehicleImage } from './DynamicVehicleImage';

const testProps = {
  images: [
    'https://www.w3schools.com/w3css/img_lights.jpg',
    'http://www.pngmart.com/files/3/Spaceship-PNG-Photos.png'
  ]
};

describe('<DynamicVehicleImage /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<DynamicVehicleImage {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
