/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { SubscriptionsPage } from './SubscriptionsPage';
import App from '../../App';

export default {
  title: 'Features/Automotive/Placeholder/Pages/SubscriptionsPage',
  component: SubscriptionsPage,
  decorators: [
    Story => {
      return (
        <div style={{ margin: '-1em' }}>
          <Story />
        </div>
      );
    }
  ]
};

export const Default = args => (
  <ContainerWrapper
    app={App}
    type="auto"
    urlPath="/placeholder/subscriptions"
  >
    <SubscriptionsPage {...args} />
  </ContainerWrapper>
);
Default.args = {};

// -----------------------------------------------------------------------
export const Error = args => (
  <ContainerWrapper
    app={App}
    type="auto"
    urlPath="/placeholder/subscriptions"
  >
    <SubscriptionsPage {...args} />
  </ContainerWrapper>
);
Error.args = {
  ...Default.args
};

// -----------------------------------------------------------------------
