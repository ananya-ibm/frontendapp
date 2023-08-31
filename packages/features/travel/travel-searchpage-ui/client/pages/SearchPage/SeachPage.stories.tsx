/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SearchPage } from './SearchPage';

type Props = React.ComponentProps<typeof SearchPage>;

export default {
  title: 'Features/Travel searchpage/Pages/SamplePage',
  component: SearchPage
};

export const Default = args => <SearchPage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
