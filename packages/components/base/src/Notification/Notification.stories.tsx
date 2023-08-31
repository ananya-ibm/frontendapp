/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Notification } from './Notification';

export default {
  title: 'Components/Base/Notification',
  component: Notification
};

type Props = React.ComponentProps<typeof Notification>;

export const Default = args => <Notification {...args} />;
Default.args = {
  title: 'Sample error',
  subtitle: 'Some details',
  caption: 'Some additional details',
  kind: 'error'
} as Props;

export const Floating = args => <Notification {...args} />;
Floating.args = {
  title: 'Sample error',
  subtitle: 'Some details',
  caption: 'Some additional details',
  display: 'floating',
  kind: 'error'
} as Props;
