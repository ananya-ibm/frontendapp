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
import { ImageTile } from './ImageTile';

const testProps = {
  alt: 'alt',
  src: 'https://www.bluewolf.com/sites/default/files/ibm-ix-salesforce-consultant.jpg'
};

describe('<ImageTile /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ImageTile {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<ImageTile {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
