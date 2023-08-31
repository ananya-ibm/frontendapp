/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SellerDashboard } from './SellerDashboard';

export default {
  title: 'Features/Marketplace/Admin/Components/SellerDashboard',
  component: SellerDashboard
};

export const Default = args => <SellerDashboard {...args} />;
Default.args = {
  store: {
    name: 'My store',
    id: '123'
  }
};
