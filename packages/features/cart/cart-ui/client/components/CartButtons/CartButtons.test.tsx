/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { renderWithTheme as render, getStories } from '@testUtils';
import { CartButtons } from './CartButtons';
import * as stories from './CartButtons.stories';

describe('<CartButtons /> component', () => {
  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });

  test('clicking button calls callbacks', () => {
    const onNext = jest.fn();

    render(<CartButtons next="next" onNext={onNext} />);

    user.click(screen.getByTestId('cart-CartButtons-next-button'));
    expect(onNext).toHaveBeenCalled();
  });
});
