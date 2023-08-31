/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render, getStories } from '@testUtils';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import * as stories from './Button.stories';
import { Button } from './Button';

describe('<Button /> component', () => {
  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });

  test('onClick is called', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} label="Click" />);
    const item = screen.getByText('Click');
    user.click(item);
    expect(onClick).toHaveBeenCalled();
  });
});
