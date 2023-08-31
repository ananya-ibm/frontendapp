/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OptionsGroup } from './OptionsGroup';

export default {
  title: 'Components/Automotive/OptionsGroup',
  component: OptionsGroup
};

const storyProps = {
  name: 'demo',
  options: ['Option 1', 'Option 2', 'Option 3']
};

export const normal = args => <OptionsGroup {...args} />;
normal.args = storyProps;
