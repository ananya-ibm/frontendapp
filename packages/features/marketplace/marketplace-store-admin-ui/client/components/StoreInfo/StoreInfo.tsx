/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { StoreForm } from '../StoreForm/StoreForm';

// ToDo: Handle multiple addresses
const mapFromStore = store => {
  return {
    ...store,
    address1: store.addresses[0].address1,
    address2: store.addresses[0].address2,
    city: store.addresses[0].city,
    zip: store.addresses[0].zip,
    county: store.addresses[0].county,
    country: store.addresses[0].country,
    phone: store.addresses[0].phone
  };
};

const mapToStore = store => {
  const newStore = {
    ...store,
    addresses: [
      {
        address1: store.address1,
        address2: store.address2,
        city: store.city,
        zip: store.zip,
        county: store.county,
        country: store.country,
        phone: store.phone
      }
    ]
  };
  delete newStore.address1;
  delete newStore.address2;
  delete newStore.city;
  delete newStore.zip;
  delete newStore.county;
  delete newStore.country;
  delete newStore.phone;
  return newStore;
};

export const StoreInfo = ({ store, onUpdate }) => {
  const onSubmit = async values => {
    const valsToSubmit = mapToStore(values);
    return onUpdate(store.id, valsToSubmit);
  };

  const mappedStore = mapFromStore(store);

  return <StoreForm data={mappedStore} onSubmit={onSubmit} />;
};
