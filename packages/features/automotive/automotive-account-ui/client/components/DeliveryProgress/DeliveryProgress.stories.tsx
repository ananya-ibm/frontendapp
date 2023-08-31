/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DeliveryProgress } from './DeliveryProgress';

export default {
  title: 'Features/Automotive/Account/Components/DeliveryProgress',
  component: DeliveryProgress
};

export const Default = args => <DeliveryProgress {...args} />;
Default.args = {
  status: 'IN_PROCESSING',
  steps: [
    { label: 'Step 1', secondaryLabel: 'Some step' },
    { label: 'Step 2', secondaryLabel: 'Another step' }
  ],
  title: 'My title'
};
