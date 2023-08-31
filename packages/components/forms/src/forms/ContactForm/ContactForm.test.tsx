/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render, getStories } from '@testUtils';
import { act } from '@testing-library/react';
import * as stories from './ContactForm.stories';

describe('<ContactForm /> component', () => {
  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    let container;
    await act(async () => {
      // eslint-disable-next-line prefer-destructuring
      container = render(<Story {...Story.args} />).container;
    });
    expect(container).toMatchSnapshot();
  });
});
