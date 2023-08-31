/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Notifications } from './Notifications';

type Props = React.ComponentProps<typeof Notifications>;

export default {
  title: 'Features/Chrome/Components/Notifications',
  component: Notifications
};

export const Default = (args: Props) => <Notifications {...args} />;
Default.args = {
  notifications: [
    { title: 'Some title', kind: 'error' },
    { title: 'Some warning', kind: 'warning' }
  ]
} as Props;

