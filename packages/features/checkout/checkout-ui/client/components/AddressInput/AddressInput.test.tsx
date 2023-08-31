/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render, getStories } from '@testUtils';
import * as stories from './AddressInput.stories';
import { AddressInput } from './AddressInput';

const mockedOnFormBackFunction = jest.fn();

type Props = Parameters<typeof AddressInput>[0];

const testProps = {
  addressToDisplay: {
    firstName: 'I am test 1',
    lastName: 'I am test 2'
  },
  type: 'billing',
  onFormBack: mockedOnFormBackFunction
} as Props;

describe('<AddressInput /> component', () => {
  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });
  test('on pressing "Back" button, onFormBack is called', () => {
    const { container, getByText } = render(<AddressInput {...testProps} />);
    expect(container).toBeDefined();
    fireEvent.click(getByText('Back'));
    expect(mockedOnFormBackFunction).toHaveBeenCalled();
  });
});
