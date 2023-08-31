/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { FeaturedItem } from './FeaturedItem';

const testProps = {
  subtitle: 'Tag required',
  title: 'Main title required',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus tincidunt turpis id mattis. Sed laoreet tempor porttitor. Utut feugiat dui, non pretium eros. Praesent blandit euismod semper. Duis condimentum euismod risus, a euismod tortor ullamcorper sit amet.',
  buttonText: 'View products',
  image: 'https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg'
};

describe('<FeaturedItem /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<FeaturedItem {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
