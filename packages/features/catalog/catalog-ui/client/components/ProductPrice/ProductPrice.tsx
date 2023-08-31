/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SkeletonLine, MonetaryAmount } from '@exo/frontend-components-core';
import { MonetaryAmount as TMonetaryAmount } from '@exo/frontend-features-catalog-logic';

import * as S from './ProductPrice.styles';

export const ProductPrice = ({ price }: Props) => {
  return (
    <S.Container>
      {price && (price.list || price.offer) && (
        <S.Price>
          <MonetaryAmount priceObject={price} />
        </S.Price>
      )}
    </S.Container>
  );
};

ProductPrice.Skeleton = () => {
  return (
    <S.Container>
      <S.Price>
        <SkeletonLine />
      </S.Price>
    </S.Container>
  );
};

type Props = {
  price: {
    list?: TMonetaryAmount;
    offer?: TMonetaryAmount;
  };
};
