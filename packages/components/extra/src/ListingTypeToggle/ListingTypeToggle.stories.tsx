/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ListingTypeToggle } from './ListingTypeToggle';

export default {
  title: 'Components/Extra/ListingTypeToggle',
  component: ListingTypeToggle
};

type Props = React.ComponentProps<typeof ListingTypeToggle>;

export const Default = (args: Props) => <ListingTypeToggle {...args} />;
Default.args = {
  mode: 'grid'
} as Props;
