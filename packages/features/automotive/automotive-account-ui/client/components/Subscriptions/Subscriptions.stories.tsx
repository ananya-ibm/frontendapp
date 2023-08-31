/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { Subscriptions } from './Subscriptions';

export default {
  title: 'Features/Automotive/Account/Components/Subscriptions',
  component: Subscriptions
};

export const Default = args => <Subscriptions {...args} />;
Default.args = {
  subscriptions: [
    {
      id: 'Charging Plan',
      status: 'ACTIVE',
      startDate: '1598532070104',
      subscribedProducts: [
        {
          id: 'Charging Plan',
          status: 'ACTIVE',
          startDate: '1598532070104',
          endDate: '1598532070105',
          product: {
            id: '1234',
            partnumber: '1234',
            name: faker.lorem.sentence(),
            price: {
              list: {
                value: '11873',
                currency: 'USD'
              }
            }
          }
        }
      ]
    }
  ],
  cancelled: [
    {
      name: 'Charging Plan',
      startDate: '1598532070104'
    }
  ]
};
