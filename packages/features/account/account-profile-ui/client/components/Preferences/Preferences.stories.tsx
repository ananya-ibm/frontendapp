/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Preferences } from './Preferences';

export default {
  title: 'Features/Account/Profile/Components/Preferences',
  component: Preferences
};

export const Default = args => <Preferences {...args} />;
Default.args = {};

// -----------------------------------------------------------

export const Skeleton = () => <Preferences.Skeleton />;
