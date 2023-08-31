/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Footer as FooterComponent } from '@exo/frontend-components-core';
import { ChromeConfig } from '../../chromeConfig';

// TODO: The contents should be brought in from the config or navigation
export const Footer = ({ config }: { config: ChromeConfig }) => {
  const intl = useIntl('features.chrome.chrome-ui.smart-components.Footer');
  return (
    <FooterComponent
      links={{
        sections1: [
          {
            title: intl.msg('footercomponent.helpandinfo', 'Help & Information'),
            items: [
              {
                url: '#',
                title: intl.msg('title.help', 'Help')
              },
              {
                url: '#',
                title: intl.msg('title.trackorder', 'Track Order')
              },
              {
                url: '#',
                title: intl.msg('title.deliverandreturns', 'Delivery & Returns')
              },
              {
                url: '/store-finder/store-finder',
                title: intl.msg('title.ourstores', 'Our Stores')
              }
            ]
          }
        ],
        sections2: [
          {
            title: intl.msg('title.about', 'About'),
            items: [
              {
                url: '#',
                title: intl.msg('title.ourproduct', 'Our Products')
              },
              {
                url: '#',
                title: intl.msg('title.aboutus', 'About Us')
              },
              {
                url: '/content/contact',
                title: intl.msg('title.contactus', 'Contact Us')
              },
              {
                url: '#',
                title: intl.msg('title.careers', 'Careers')
              },
              {
                url: '/wishlist/wishlist',
                title: intl.msg('title.wishlist', 'Wishlist')
              }
            ]
          }
        ]
      }}
      social={{
        header: intl.msg('header.subscribenewsletter', 'Subscribe to our newsletter'),
        buttonText: intl.msg('buttontext.signup', 'Sign Up'),
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
      }}
      copyright={config?.footer?.copyright}
    />
  );
};
