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
import { List } from './List';

const testProps = {
  items: [
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    },
    {
      title: '16/09/19',
      text: 'XX 000 0000',
      url: '#'
    }
  ]
};

describe('<List /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<List {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<List {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
