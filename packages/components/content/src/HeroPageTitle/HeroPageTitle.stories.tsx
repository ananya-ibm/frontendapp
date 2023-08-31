/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import React from 'react';
import { HeroPageTitle } from './HeroPageTitle';

export default {
  title: 'Components/Content/HeroPageTitle',
  component: HeroPageTitle
};

export const Default = args => <HeroPageTitle {...args} />;
Default.args = {
  title: 'Page title'
};

export const WithCustomContent = args => (
  <HeroPageTitle {...args}>
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <h2 style={{ marginRight: '1rem' }}>Custom content with a</h2> <Button label="button" />
    </div>
  </HeroPageTitle>
);
WithCustomContent.args = { ...Default.args };

export const WithImage = args => <HeroPageTitle {...args} />;
WithImage.args = {
  ...Default.args,
  image: '/static/automotive/batmobile.png'
};

export const WithColor = args => <HeroPageTitle {...args} />;
WithColor.args = {
  ...Default.args,
  background: 'red',
  foreground: 'white'
};
