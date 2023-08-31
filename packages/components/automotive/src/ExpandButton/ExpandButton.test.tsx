/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { ExpandButton } from './ExpandButton';

const testProps = {
  isExpanded: true,
  expandedText: 'See More',
  lessText: 'See Less',
  onExpandClick: () => {}
};

describe('<ExpandButton /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ExpandButton {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
