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
import { mockSiteData } from '../../testUtils/mockSiteData';
import { Footer } from './Footer';

const testProps = {
  social: mockSiteData.siteFooter.social,
  copyright: mockSiteData.siteFooter.copyright,
  links: {
    sections1: [
      {
        title: 'Help & Information',
        items: [
          {
            url: '#',
            title: 'Help'
          },
          {
            url: '#',
            title: 'Track Order'
          },
          {
            url: '#',
            title: 'Delivery & Returns'
          },
          {
            url: '#',
            title: 'Our Stores'
          }
        ]
      },
      {
        title: 'About IBM iX',
        items: [
          {
            url: '#',
            title: 'Our Products'
          },
          {
            url: '#',
            title: 'About Us'
          },
          {
            url: '#',
            title: 'Contact Us'
          },
          {
            url: '#',
            title: 'Careers'
          }
        ]
      }
    ],
    sections2: [
      {
        title: 'Help & Information',
        items: [
          {
            url: '#',
            title: 'Help'
          },
          {
            url: '#',
            title: 'Track Order'
          },
          {
            url: '#',
            title: 'Delivery & Returns'
          },
          {
            url: '#',
            title: 'Our Stores'
          }
        ]
      },
      {
        title: 'About IBM iX',
        items: [
          {
            url: '#',
            title: 'Our Products'
          },
          {
            url: '#',
            title: 'About Us'
          },
          {
            url: '#',
            title: 'Contact Us'
          },
          {
            url: '#',
            title: 'Careers'
          }
        ]
      }
    ]
  }
};

describe('<Footer /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<Footer {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<Footer {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
