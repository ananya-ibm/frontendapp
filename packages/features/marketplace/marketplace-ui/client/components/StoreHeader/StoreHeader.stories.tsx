/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { StoreHeader } from './StoreHeader';

export default {
  title: 'Features/Marketplace/Store/Components/StoreHeader',
  component: StoreHeader
};

export const Default = args => <StoreHeader {...args} />;
Default.args = {
  store: {
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
};
