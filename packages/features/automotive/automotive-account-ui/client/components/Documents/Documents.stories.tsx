/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { formatDate } from '@exo/frontend-common-i18n';
import { Documents } from './Documents';

export default {
  title: 'Features/Automotive/Account/Components/Documents',
  component: Documents
};

export const Default = args => <Documents {...args} />;
Default.args = {
  activeDocuments: [
    {
      id: '01',
      name: 'Document Name',
      expiry: `Expires: ${formatDate(
        new Date('2020-07-14T11:01:58.135Z').toString(),
        'dd/MM/yyyy'
      )}`
    },
    {
      id: '02',
      name: 'Document Name',
      expiry: `Expires: ${formatDate(
        new Date('2020-07-14T11:01:58.135Z').toString(),
        'dd/MM/yyyy'
      )}`
    }
  ],
  expiredDocuments: [
    {
      id: '01',
      name: 'Expired Document Name',
      expiry: `Expires: ${formatDate(
        new Date('2020-07-14T11:01:58.135Z').toString(),
        'dd/MM/yyyy'
      )}`
    },
    {
      id: '02',
      name: 'Expired Document Name',
      expiry: `Expires: ${formatDate(
        new Date('2020-07-14T11:01:58.135Z').toString(),
        'dd/MM/yyyy'
      )}`
    }
  ]
};
