/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SystemsPage } from './SystemsPage';

type Props = React.ComponentProps<typeof SystemsPage>;

export default {
  title: 'Features/Devops/Pages/SystemsPage',
  component: SystemsPage
};

export const Default = (args: Props) => <SystemsPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
