/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SchemasPage } from './SchemasPage';

type Props = React.ComponentProps<typeof SchemasPage>;

export default {
  title: 'Features/Devops/Pages/SchemasPage',
  component: SchemasPage
};

export const Default = (args: Props) => <SchemasPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
