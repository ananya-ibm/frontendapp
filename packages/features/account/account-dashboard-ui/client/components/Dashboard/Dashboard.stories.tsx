/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import { Dashboard } from './Dashboard';
import b2cConfig from '../../../../../../apps/commerce/applications';

export default {
  title: 'Features/Account/Dashboard/Components/Dashboard',
  component: Dashboard
};

type Props = React.ComponentProps<typeof Dashboard>;

export const Default = (args: Props) => (
  <SmartComponentWrapper config={b2cConfig} urlPath="/account-profile/profile">
    <SessionContextProvider state={{ roles: ['user', 'customer'] }}>
      <Dashboard {...args}>
        <div>Children</div>
      </Dashboard>
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Default.args = {
  title: 'Account Dashboard',
  menus: [
    {
      title: 'Main',
      items: [
        { url: '/url1', text: 'Item 1' },
        { url: '/url2', text: 'Item 2' }
      ]
    }
  ]
} as Props;
