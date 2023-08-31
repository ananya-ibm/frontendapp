/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DeploymentsPage } from './DeploymentsPage';

type Props = React.ComponentProps<typeof DeploymentsPage>;

export default {
  title: 'Features/Devops/Pages/DeploymentsPage',
  component: DeploymentsPage
};

export const Default = (args: Props) => <DeploymentsPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
