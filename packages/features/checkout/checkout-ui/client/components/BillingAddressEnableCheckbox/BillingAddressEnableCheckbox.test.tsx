/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render, getStories } from '@testUtils';
import { fireEvent } from '@testing-library/react';
import * as stories from './BillingAddressEnableCheckbox.stories';
import { BillingAddressEnableCheckbox } from './BillingAddressEnableCheckbox';

const mockedOnCheckFunc = jest.fn();

const testProps = {
  isBillingEnabled: false,
  onCheck: mockedOnCheckFunc
};

describe('<BillingAddressEnableCheckbox /> component', () => {
  test.each(getStories(stories))('its snapshot matches story %s', async (_name, Story) => {
    const { container } = render(<Story {...Story.args} />);
    expect(container).toMatchSnapshot();
  });
  test('checking causes onCheck to be called', () => {
    const { container, getByLabelText } = render(<BillingAddressEnableCheckbox {...testProps} />);
    expect(container).toBeDefined();
    fireEvent.click(getByLabelText('Use a different billing address?'));
    expect(mockedOnCheckFunc).toHaveBeenCalled();
  });
});
