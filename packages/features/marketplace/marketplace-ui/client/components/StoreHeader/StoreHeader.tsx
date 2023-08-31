/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-restricted-syntax */

import React from 'react';
import { Location } from '@carbon/react/icons';
import { Stars, ImageTile } from '@exo/frontend-components-commerce';

import * as S from './StoreHeader.styles';

const salesNumber = '023264';

export const StoreHeader = ({ store }) => {
  return (
    <S.StoreHeader cardStyle={store?.theme}>
      <S.StoreInfo>
        <S.Media>
          <ImageTile src={store?.logo} alt="Store" />
        </S.Media>
        <S.Writing>
          <S.Title>{store?.name}</S.Title>
          <S.Text>{store?.announcement}</S.Text>
        </S.Writing>
      </S.StoreInfo>
      <S.StoreDetails>
        {/* TODO: Dont hardcode store sales */}
        <S.Text>{`${salesNumber} sales`}</S.Text>
        <S.Text>
          {/* TODO: Dont hardcode store rating */}
          <Stars rating={5} totalStars={5} />
        </S.Text>
        <S.Text>
          <Location size={16} />
          {`${store?.addresses[0]?.city}, ${store?.addresses[0]?.country}`}
        </S.Text>
      </S.StoreDetails>
    </S.StoreHeader>
  );
};

export default StoreHeader;
