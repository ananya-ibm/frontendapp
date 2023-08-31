/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Progress } from './Progress';

export default {
  title: 'Components/Extra/Progress',
  component: Progress
};

export const normal = args => <Progress {...args} />;
normal.args = {};

export const withValue = args => <Progress {...args} />;
withValue.args = { value: 60 };

export const oneHundredPercent = args => <Progress {...args} />;
oneHundredPercent.args = { value: 100 };
