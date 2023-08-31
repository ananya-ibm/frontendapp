/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { OptionsGroup } from './OptionsGroup';

const testProps = {
  name: 'demo',
  options: ['Option 1', 'Option 2', 'Option 3']
};

describe('<OptionsGroup /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<OptionsGroup {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
