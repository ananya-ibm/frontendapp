/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Footer } from './Footer';

export default {
  title: 'Components/Core/Footer',
  component: Footer
};

const storyProps = {
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
      }
    ],
    sections2: [
      {
        title: 'About',
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
  },
  social: {
    header: 'Subscribe to our newsletter',
    buttonText: 'Subscribe',
    socialLinks: [
      {
        url: 'https://www.facebook.com/',
        fgColor: 'white',
        bgColor: '#000'
      },
      {
        url: 'https://twitter.com/',
        fgColor: 'white',
        bgColor: '#000'
      },
      {
        url: 'https://www.youtube.com/user/',
        fgColor: 'white',
        bgColor: '#000'
      },
      {
        url: 'https://www.linkedin.com/company/',
        fgColor: 'white',
        bgColor: '#000'
      },
      {
        url: 'https://www.instagram.com/',
        fgColor: 'white',
        bgColor: '#000'
      }
    ]
  },
  copyright: `Copyright © ${new Date().getFullYear()} IBM All rights reserved.`
};

export const normal = args => <Footer {...args} />;
normal.args = storyProps;
