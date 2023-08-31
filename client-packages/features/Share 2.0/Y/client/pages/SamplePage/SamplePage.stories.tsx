/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SamplePage } from './SamplePage';

type Props = React.ComponentProps<typeof SamplePage>;

export default {
  title: 'Features/Share 2 0/Pages/SamplePage',
  component: SamplePage
};

export const Default = (args: Props) => <SamplePage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
