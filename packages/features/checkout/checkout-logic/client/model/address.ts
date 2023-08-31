/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import pick from 'lodash/pick';
export type Address = {
  id?: string;
  address1?: string;
  address2?: string;
  city?: string;
  // TODO: Remove country
  country?: string;
  countryCode?: string;
  countryName?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  province?: string;
  zip?: string;
  email?: string;
};

// prettier-ignore
export const cleanAddress = (addr: Address) =>
  pick(addr, [
    'address1',
    'address2',
    'city',
    'country',
    'province',
    'email',
    'firstName',
    'lastName',
    'name',
    'phone',
    'zip'
  ]);
