/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LoggingActivityPage } from './LoggingActivityPage';

type Props = React.ComponentProps<typeof LoggingActivityPage>;

export default {
  title: 'Features/Work management logging activity page/Pages/LoggingActivityPage',
  component: LoggingActivityPage
};

export const Default = args => <LoggingActivityPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
