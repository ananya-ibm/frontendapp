/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { AddressSearch } from '../types';

/* eslint-disable no-else-return */

const apiKey = process.env.GET_ADDRESS_API_KEY;

export const getAddressIOProvider: AddressSearch = {
  search: async q => {
    if (q !== '' && q.length > 5) {
      const res = await fetch(`https://api.getAddress.io/autocomplete/${q}?api-key=${apiKey}`);
      return (await res.json()).suggestions.map((s: ResponseEntry) => ({
        name: s.address,
        value: s.id
      }));
    } else {
      return [];
    }
  },

  lookup: async id => {
    const res = await fetch(`https://api.getAddress.io/get/${id}?api-key=${apiKey}`);
    const r = await res.json();

    return {
      address1: r.line_1,
      address2: r.line_2,
      city: r.town_or_city,
      country: 'GB',
      zip: r.postcode,
      province: ''
    };
  }
};

type ResponseEntry = {
  address: string;
  id: string;
};
