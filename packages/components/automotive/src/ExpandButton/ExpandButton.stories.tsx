/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ExpandButton } from './ExpandButton';

export default {
  title: 'Components/Automotive/ExpandButton',
  component: ExpandButton
};

const storyProps1 = {
  expandedText: 'See More',
  lessText: 'See Less',
  onExpandClick: () => {}
};

const storyProps2 = {
  isExpanded: true,
  expandedText: 'See More',
  lessText: 'See Less',
  onExpandClick: () => {}
};

export const normal = args => <ExpandButton {...args} />;
normal.args = storyProps1;

export const expanded = args => <ExpandButton {...args} />;
expanded.args = storyProps2;
