/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { StoreInfo } from './StoreInfo';

export default {
  title: 'Features/Marketplace/Admin/Components/StoreInfo',
  component: StoreInfo
};

export const Default = args => <StoreInfo {...args} />;
Default.args = {
  store: {
    id: '123',
    name: 'My store',
    addresses: [{}]
  }
};
