/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { StoreFinder } from './StoreFinder';

export default {
  title: 'Features/Store/Components/StoreFinder',
  component: StoreFinder
};

const stores = [
  {
    id: 1,
    name: 'Armonk',
    city: 'Armonk',
    country: 'US'
  },
  {
    id: 2,
    name: 'Yorktown Heights',
    city: 'Yorktown Heights',
    country: 'US'
  },
  {
    id: 3,
    name: 'Kista',
    city: 'Stockholm',
    country: 'Sweden'
  }
];

export const Default = args => <StoreFinder {...args} />;
Default.args = {
  stores,
  storeId: {},
  countries: [{ code: 'GB', label: 'Great Britain' }]
};

// ----------------------------------------------------
export const Open = args => <StoreFinder {...args} />;
Open.args = {
  ...Default.args,
  isOpen: true
};
