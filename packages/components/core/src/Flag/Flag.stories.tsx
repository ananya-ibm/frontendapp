/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Flag } from './Flag';

export default {
  title: 'Components/Core/Flag',
  component: Flag
};

const storyProps = {
  locale: 'GB'
};

export const normal = args => <Flag {...args} />;
normal.args = storyProps;

export const Skeleton = args => <Flag.Skeleton {...args} />;
Skeleton.args = {};
