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
import { SocialLinks } from './SocialLinks';

const testprops = {
  items: [
    {
      url: 'https://www.facebook.com/',
      fgColor: 'white',
      bgColor: '#0047bb'
    },
    {
      url: 'https://twitter.com/',
      fgColor: 'white',
      bgColor: '#0047bb'
    },
    {
      url: 'https://www.youtube.com/user/',
      fgColor: 'white',
      bgColor: '#0047bb'
    },
    {
      url: 'https://www.linkedin.com/company/',
      fgColor: 'white',
      bgColor: '#0047bb'
    },
    {
      url: 'https://www.instagram.com/',
      fgColor: 'white',
      bgColor: '#0047bb'
    }
  ]
};

describe('<SocialLinks /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<SocialLinks {...testprops} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<SocialLinks {...testprops} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
