/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Header } from './Header';

export default {
  title: 'Components/Core/Header',
  component: Header
} as any;

const storyProps = {
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

export const normal = args => <Header {...args} />;
normal.args = storyProps;
