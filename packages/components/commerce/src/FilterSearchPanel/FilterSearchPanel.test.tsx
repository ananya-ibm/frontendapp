/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { axe } from 'jest-axe';
import { FilterSearchPanel } from './FilterSearchPanel';

const testProps = {
  onSubmit: jest.fn(),
  searchFields: [
    {
      id: 'partsearch-1',
      name: 'partsearch-1',
      placeholder: 'Model',
      label: 'Model',
      type: 'text',
      size: 'md'
    },
    {
      id: 'partsearch-2',
      name: 'partsearch-2',
      placeholder: 'Doors',
      label: 'Doors',
      type: 'text',
      size: 'sm'
    }
  ]
};

describe('<FilterSearchPanel /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<FilterSearchPanel {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<FilterSearchPanel {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
