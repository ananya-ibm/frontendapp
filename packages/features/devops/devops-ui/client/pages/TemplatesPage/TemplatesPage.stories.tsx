/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TemplatesPage } from './TemplatesPage';

type Props = React.ComponentProps<typeof TemplatesPage>;

export default {
  title: 'Features/Devops/Pages/TemplatesPage',
  component: TemplatesPage
};

export const Default = (args: Props) => <TemplatesPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
