/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LoginPane } from './LoginPane';

export default {
  title: 'Features/Authentication/Components/LoginPane',
  component: LoginPane
};

export const Default = args => <LoginPane {...args} />;
Default.args = {};

// -------------------------------------------------

export const WithRegistration = args => <LoginPane {...args} />;
WithRegistration.args = {
  onRegister: () => {}
};
