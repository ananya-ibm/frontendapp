/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OrganizationHeader } from './OrganizationHeader';

export default {
  title: 'Features/B2B/Account/Components/OrganizationHeader',
  component: OrganizationHeader
};

export const Default = args => <OrganizationHeader {...args} />;
Default.args = {
  organization: {
    id: '123',
    name: 'Acme Corp'
  }
};
