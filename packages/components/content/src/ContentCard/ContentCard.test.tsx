/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { ContentCard } from './ContentCard';

const testProps = {
  title: 'New Offer',
  subtitle: 'Check out the latest offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  linkText: 'Learn More',
  link: '#'
};

describe('<ContentCard /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ContentCard {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
