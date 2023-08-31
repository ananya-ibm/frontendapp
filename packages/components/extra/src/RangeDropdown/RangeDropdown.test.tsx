/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { RangeDropdown } from './RangeDropdown';

const testProps = {
  label: 'test',
  children: <div>children</div>
};

describe('<RangeDropdown /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<RangeDropdown {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should open when clicked', async () => {
    const { getByText, findByText } = render(<RangeDropdown {...testProps} />);
    const openText = getByText(testProps.label);
    expect(openText).toBeDefined();
    fireEvent.click(openText);

    const expandedText = await findByText('children');
    expect(expandedText).toBeDefined();
  });

  test('it passes an axe accesibility check', async () => {
    const { container } = render(<RangeDropdown {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
