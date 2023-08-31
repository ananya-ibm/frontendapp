/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/prop-types */

import addons from '@storybook/addons';
import * as React from 'react';
import { ThemePanel } from './ThemePanel'; 

addons.register('storybook/exo-themes', api => {
  addons.addPanel('storybook/exo-themes/panel', {
    title: 'Theme',
    render: ({ active }) => {
      return (
        <ThemePanel
          key="storybook-exo-theme-addon"
          channel={addons.getChannel()}
          api={api}
          active={active}
        />
      );
    }
  });
});
