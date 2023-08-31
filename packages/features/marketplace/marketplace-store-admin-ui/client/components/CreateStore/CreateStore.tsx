/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { StoreForm } from '../StoreForm/StoreForm';
import * as S from './CreateStore.styles';

export const CreateStore = ({ onCreate }) => {
  const onSubmit = values => {
    const mappedVals = {
      name: values.name,
      announcement: values.announcement,
      email: values.email,
      vatNo: values.vatNo,
      addresses: [
        {
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          county: values.county,
          zip: values.zip,
          country: values.country,
          phone: values.phone
        }
      ],
      logo: values.logo,
      image: values.image,
      theme: values.theme
    };
    return onCreate(mappedVals);
  };

  return (
    <S.CreateStore>
      <StoreForm onSubmit={onSubmit} />
    </S.CreateStore>
  );
};
