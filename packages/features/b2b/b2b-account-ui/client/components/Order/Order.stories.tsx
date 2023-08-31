/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Order } from './Order';

export default {
  title: 'Features/B2B/Account/Components/Order',
  component: Order
};

export const Default = args => <Order {...args} />;
Default.args = {
  order: {
    id: '1',
    date: '2021-04-05',
    user: 'John Doe',
    status: 'Approved'
  },
  onUpdateOrder: () => {}
};
