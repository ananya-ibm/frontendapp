/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render, getStories, mockDate, RealDate } from '@testUtils';
import * as stories from './Messages.stories';

beforeEach(() => {
  mockDate('2020-09-01T14:48:00.000Z');
});

afterEach(() => {
  global.Date = RealDate;
});

describe('<Messages /> component', () => {
  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });
});
