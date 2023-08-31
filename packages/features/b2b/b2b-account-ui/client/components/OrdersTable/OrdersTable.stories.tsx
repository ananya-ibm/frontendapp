/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OrdersTable } from './OrdersTable';

export default {
  title: 'Features/B2B/Account/Components/OrdersTable',
  component: OrdersTable
};

export const Default = args => <OrdersTable {...args} />;
Default.args = {
  orders: [
    {
      id: '1',
      user: 'Anthony Lombardi',
      date: '01/01/20',
      status: 'open'
    },
    {
      id: '2',
      user: 'Lars Bauer',
      date: '01/01/20',
      status: 'approved'
    },
    {
      id: '3',
      user: 'Lars Bauer',
      date: '01/01/20',
      status: 'rejected'
    }
  ]
};
