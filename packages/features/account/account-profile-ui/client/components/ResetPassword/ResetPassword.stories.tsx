/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { NotificationContextProvider } from '@exo/frontend-common-notification';
import { ResetPassword } from './ResetPassword';

export default {
  title: 'Features/Account/Profile/Components/ResetPassword',
  component: ResetPassword
};

type Props = React.ComponentProps<typeof ResetPassword>;

export const Default = (args: Props) => (
  <NotificationContextProvider>
    <ResetPassword {...args} />
  </NotificationContextProvider>
);
Default.args = {} as Props;

// -----------------------------------------------------------

export const Skeleton = () => <ResetPassword.Skeleton />;
