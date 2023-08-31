/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import App from '../../App';
import { LoginPage } from './LoginPage';
import b2cProfileMock from '../../../../../account/account-profile-ui/mocks/b2c-profile';
import b2cConfig from '../../../../../../apps/commerce/applications';

export default {
  title: 'Features/Authentication/Pages/LoginPage',
  component: LoginPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => (
  <ContainerWrapper app={App} mocks={b2cProfileMock.me()} urlPath="/auth/login">
    <LoginPage {...args} />
  </ContainerWrapper>
);
Default.args = {
  config: b2cConfig.featureConfig.authentication
};
