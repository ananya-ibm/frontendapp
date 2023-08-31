/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { ContentPage } from './ContentPage';
import App from '../../App';

export default {
  title: 'Features/Content/Content/Pages/ContentPage',
  component: ContentPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper app={App}>
    <ContentPage {...args} />
  </ContainerWrapper>
);
Default.args = {
  id: 'some-content-page'
};
