/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { AutomotiveHero } from './AutomotiveHero';

const testProps = {
  backgroundColor: '#033387',
  textColor: '#ccc',
  description:
    'This is the car from Back to the Future,  which you really ought to watch if you haven’t already.',
  imgSrc: 'image',
  title: 'DMC Delorean'
};

describe('<AutomotiveHero /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<AutomotiveHero {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
