/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { OptionCard } from './OptionCard';

const testProps = {
  title: 'Personal Contract Purchase',
  onClick: () => {},
  onMoreClick: () => {},
  children: <div>Children</div>
};

describe('<OptionCard /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<OptionCard {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
