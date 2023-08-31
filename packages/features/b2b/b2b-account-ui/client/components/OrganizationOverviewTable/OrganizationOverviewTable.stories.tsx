/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OrganizationOverviewTable } from './OrganizationOverviewTable';

export default {
  title: 'Features/B2B/Account/Components/OrganizationOverviewTable',
  component: OrganizationOverviewTable
};

export const Default = args => <OrganizationOverviewTable {...args} />;
Default.args = {
  organization: {
    id: 123,
    name: 'Acme Corp',
    members: [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Moe'
      }
    ]
  }
};
