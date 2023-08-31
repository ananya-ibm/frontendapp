/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Expander } from './Expander';

export default {
  title: 'Components/Core/Expander',
  component: Expander
};

const storyProps1 = {
  label: 'This is  a test'
};

const storyProps2 = {
  label: 'This is  a test',
  isDefaultExpanded: true
};

export const normal = args => (
  <Expander {...args}>
    <div>This is the expander content</div>
  </Expander>
);
normal.args = storyProps1;

export const Expanded = args => (
  <Expander {...args}>
    <div>This is the expander content</div>
  </Expander>
);
Expanded.args = storyProps2;
