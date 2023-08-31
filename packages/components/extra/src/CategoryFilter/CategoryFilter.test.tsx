/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import user from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { CategoryFilter } from './CategoryFilter';

const testProps = {
  heading: 'Primary category',
  primaryCategoryList: [
    {
      id: '1',
      name: 'Necklaces'
    },
    {
      id: '2',
      name: 'Pendants'
    },
    {
      id: '3',
      name: 'Bracelets'
    },
    {
      id: '4',
      name: 'Earings'
    },
    {
      id: '5',
      name: 'Rings'
    }
  ],
  onClick: () => {}
};

describe('<CategoryFilter /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<CategoryFilter {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  // ToDo: Renable this test
  test.skip('Clicking on a category list item applies active style', () => {
    render(<CategoryFilter {...testProps} />);
    const item = screen.getByText('Pendants');
    user.click(item);

    expect(item).toHaveStyle('background-color: rgb(243, 243, 243)');
  });

  it('calls "onClick" prop on Category click', () => {
    const onClick = jest.fn();
    render(<CategoryFilter {...testProps} onClick={onClick} />);
    const item = screen.getByText('Rings');
    user.click(item);
    expect(onClick).toHaveBeenCalled();
  });

  test('it passes an axe accesibility check', async () => {
    const { container } = render(<CategoryFilter {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
