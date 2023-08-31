/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SocialLinks } from './SocialLinks';

export default {
  title: 'Components/Core/SocialLinks',
  component: SocialLinks
};

const storyProps = {
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

export const normal = args => <SocialLinks {...args} />;
normal.args = storyProps;
