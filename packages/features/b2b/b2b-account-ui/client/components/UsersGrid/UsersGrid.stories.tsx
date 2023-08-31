/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import range from 'lodash/range';
import { UsersGrid } from './UsersGrid';

export default {
  title: 'Features/B2B/Account/Components/UsersGrid',
  component: UsersGrid
};

export const Default = args => <UsersGrid {...args} />;
Default.args = {
  organization: {
    id: 123,
    name: 'Acme Corp',
    members: range(1, 5).map(i => ({
      id: i.toString(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      email: faker.internet.email()
    }))
  }
};
