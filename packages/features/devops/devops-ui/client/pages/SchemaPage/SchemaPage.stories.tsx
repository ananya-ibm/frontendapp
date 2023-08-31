/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SchemaPage } from './SchemaPage';

type Props = React.ComponentProps<typeof SchemaPage>;

export default {
  title: 'Features/Devops/Pages/SchemaPage',
  component: SchemaPage
};

export const Default = (args: Props) => <SchemaPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
