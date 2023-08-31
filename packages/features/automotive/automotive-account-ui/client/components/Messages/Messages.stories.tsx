/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Messages } from './Messages';

export default {
  title: 'Features/Automotive/Account/Components/Messages',
  component: Messages
};

export const Default = args => <Messages {...args} />;
Default.args = {
  messageTypes: ['Read', 'Unread'],
  messages: [
    {
      id: '3',
      title: 'Finance Request Documentation Update No.3',
      from: 'Finance department',
      timestamp: '2020-09-04T11:48:00.000Z',
      isUnread: true
    },
    {
      id: '2',
      title: 'Finance Request Documentation Update No.2',
      from: 'Finance department',
      timestamp: '2020-09-03T10:48:00.000Z',
      isUnread: false
    }
  ]
};
