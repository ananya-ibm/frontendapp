/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as R from 'ramda';
import faker from 'faker';
import { Orders } from './Orders';

export default {
  title: 'Features/Marketplace/Admin/Components/Orders',
  component: Orders
};

export const Default = args => <Orders {...args} />;
Default.args = {
  orders: R.range(0, 10).map(i => ({
    id: i.toString(),
    date_order_placed: faker.date.between(new Date(2021, 1, 1), new Date(2021, 6)).toDateString(),
    order_status: 'New',
    customer_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    order_value: faker.commerce.price()
  })),
  getOrder: () => Promise.resolve(undefined)
};
