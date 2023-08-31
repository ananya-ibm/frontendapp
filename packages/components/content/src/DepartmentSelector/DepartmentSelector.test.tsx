/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { DepartmentSelector } from './DepartmentSelector';

const testProps = {
  departments: [
    {
      title: 'Womens',
      bgImg:
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      altText: 'Womenswear',
      href: '#'
    },
    {
      title: 'Mens',
      bgImg:
        'https://images.unsplash.com/photo-1522609946836-c85cba8eb943?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      altText: 'Menswear',
      href: '#'
    }
  ]
};

describe('<DepartmentSelector /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<DepartmentSelector {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
