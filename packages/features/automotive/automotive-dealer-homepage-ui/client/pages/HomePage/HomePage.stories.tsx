/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { HomePage } from './HomePage';
import App from '../../App';

export default {
  title: 'Features/Automotive/DealerHomePage/Pages/HomePage',
  component: HomePage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper type="auto" app={App}>
    <HomePage {...args} />
  </ContainerWrapper>
);
Default.args = {};
