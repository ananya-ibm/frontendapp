/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render, getStories } from '@testUtils';
import { axe } from 'jest-axe';
import * as stories from './Menu.stories';

describe('<Menu /> component', () => {
  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });

  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    const { container } = render(<Story {...Story.args} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
