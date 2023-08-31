/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Menu } from './Menu';

export default {
  title: 'Components/Core/Menu',
  component: Menu
};

export const Default = args => (
  <div style={{ maxWidth: '20rem' }}>
    <Menu {...args} />
  </div>
);
Default.args = {
  activeUrl: '#2',
  items: [
    {
      title: 'My Account',
      url: '#a',
      isExpanded: true,
      items: [
        { url: '#1', label: 'Profile' },
        { url: '#2', label: 'Personal details' },
        { url: '#3', label: 'My orders' }
      ]
    },
    {
      title: 'My Stores',
      url: '#b',
      items: [
        { url: '#4', label: 'Stores' },
        { url: '#5', label: 'Brands' },
        { url: '#6', label: 'Orders' }
      ]
    },
    {
      title: 'Consectetuer',
      url: '#c',
      items: [{ url: '#7', label: 'Lorem' }]
    },
    {
      title: 'Adispcing',
      url: '#d',
      items: [{ url: '#8', label: 'Lorem' }]
    }
  ]
};
