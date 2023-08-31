/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { StoreForm } from './StoreForm';

export default {
  title: 'Features/Marketplace/Admin/Components/StoreForm',
  component: StoreForm
};

export const Default = args => <StoreForm {...args} />;
Default.args = {
  onSubmit: () => {}
};
