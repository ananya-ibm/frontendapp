/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ListingSortBy } from './ListingSortBy';

export default {
  title: 'Components/Extra/ListingSortBy',
  component: ListingSortBy
};

type Props = React.ComponentProps<typeof ListingSortBy>;

export const Default = (args: Props) => <ListingSortBy {...args} />;
Default.args = {
  onChange: () => {}
} as Props;
