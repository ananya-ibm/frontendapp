/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import * as S from './Address.styles';

export const Address = ({ title, address }: Props) => {
  return (
    <S.AddressDetail>
      {title && <S.Title>{title}</S.Title>}
      <S.AddressRow>
        {address.title ?? ''} {address.lastName}{' '}
        {address.firstName ? `, ${address.firstName}` : ''}
      </S.AddressRow>
      {address.company && <S.AddressRow>{address.company}</S.AddressRow>}
      {address.address1 && <S.AddressRow>{address.address1}</S.AddressRow>}
      {address.address2 && <S.AddressRow>{address.address2}</S.AddressRow>}
      {address.zip && <S.AddressRow>{address.zip}</S.AddressRow>}
      {address.city && <S.AddressRow>{address.city}</S.AddressRow>}
      {address.province && <S.AddressRow>{address.province}</S.AddressRow>}
      {address.countryName && <S.AddressRow>{address.countryName}</S.AddressRow>}
    </S.AddressDetail>
  );
};

type Props = {
  address: {
    title?: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    countryName?: string;
    countryCode?: string;
    zip?: string;
  };
  title?: string | React.ReactNode;
};
