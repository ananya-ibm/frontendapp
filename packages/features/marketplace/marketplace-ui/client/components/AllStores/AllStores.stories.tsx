/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { AllStores } from './AllStores';

export default {
  title: 'Features/Marketplace/Store/Components/AllStores',
  component: AllStores
};

export const Default = args => <AllStores {...args} />;
Default.args = {
  stores: [
    {
      id: '123',
      name: 'My store',
      announcement: 'Some important news!',
      addresses: [
        {
          address1: faker.address.streetAddress(),
          address2: '',
          city: faker.address.city()
        }
      ],
      logo: faker.image.business()
    },
    {
      id: '124',
      name: 'My Second store',
      announcement: 'Big sale!',
      addresses: [
        {
          address1: faker.address.streetAddress(),
          address2: '',
          city: faker.address.city()
        }
      ],
      logo: faker.image.abstract()
    }
  ]
};
