/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Nav } from './Nav';

export default {
  title: 'Components/Extra/Nav',
  component: Nav
} as any;

export const normal = (args) => <Nav {...args} />;
normal.args = {
  isMenuOpen: false,
  onMenuToggle: () => {},
  link: '',
  navItems: [
    {
      text: 'Support',
      url: '/#'
    },
    {
      text: 'Events',
      url: '/#'
    },
    {
      text: 'Pathways',
      url: '/#'
    }
  ]
};
