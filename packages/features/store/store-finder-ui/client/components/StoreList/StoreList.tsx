/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { LayoutSpacing } from '@exo/frontend-components-core';
import React from 'react';
import * as S from './StoreList.styles';

// TODO: Remove hardcoding of countries
// const COUNTRIES = [{ code: 'GB', label: 'Great Britain' }];

export const StoreList = ({ storename, address, city, phone, openHours }) => {
  return (
    <S.Item>
      <>
        Store Name: {storename} <LayoutSpacing size="sm" />
        Address: {address}, {city} ,{phone} <LayoutSpacing size="sm" />
        Opening Hours:
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={(() => {
            return { __html: openHours };
          })()}
        />
        <LayoutSpacing size="sm" />
      </>
    </S.Item>
  );
};
