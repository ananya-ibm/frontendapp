/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SortByDropdown } from './SortByDropdown';

export default {
  title: 'Components/Extra/SortByDropdown',
  component: SortByDropdown
};

const storyProps = {
  id: 'SortByDropdown',
  onChange: () => {}
};

export const normal = args => <SortByDropdown {...args} />;
normal.args = storyProps;
