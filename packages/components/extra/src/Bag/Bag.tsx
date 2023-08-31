/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Bag as BagIcon } from '@exo/frontend-components-core';
import * as S from './Bag.styles';

export const Bag = ({ cartQuantity, basketUrl }: Props) => {
  return (
    <S.Bag to={basketUrl}>
      <span>Cart</span>
      <S.Inner>
        <S.Icon>
          <BagIcon />
        </S.Icon>
        {cartQuantity && <S.Qty>{cartQuantity}</S.Qty>}
      </S.Inner>
    </S.Bag>
  );
};

type Props = {
  basketUrl: string;
  cartQuantity: number;
};
