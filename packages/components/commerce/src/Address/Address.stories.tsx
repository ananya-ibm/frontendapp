/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Address } from './Address';

export default {
  title: 'Components/Commerce/Address',
  component: Address
};

export const normal = args => <Address {...args} />;
normal.args = {
  title: 'Address Test',
  address: {
    title: 'test',
    firstName: 'test',
    lastName: 'test',
    address1: 'test',
    address2: 'test',
    city: 'test',
    province: 'test',
    county: 'test',
    country: 'test',
    zip: 'test'
  }
};
