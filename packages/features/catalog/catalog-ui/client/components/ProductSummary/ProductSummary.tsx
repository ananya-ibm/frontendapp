/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SkeletonLine } from '@exo/frontend-components-core';
import * as S from './ProductSummary.styles';

export const ProductSummary = ({ product }: Props) => {
  return (
    <S.ProductSummary>
      <S.Partnumber>{product.partnumber}</S.Partnumber>
      <S.ProductName>{product.name}</S.ProductName>
      <S.ShortDescription>{product.description}</S.ShortDescription>
    </S.ProductSummary>
  );
};

ProductSummary.Skeleton = () => {
  return (
    <S.ProductSummary>
      <S.Partnumber>
        <SkeletonLine />
      </S.Partnumber>
      <S.ProductName>
        <SkeletonLine />
      </S.ProductName>
      <S.ShortDescription>
        <SkeletonLine />
      </S.ShortDescription>
    </S.ProductSummary>
  );
};

type Props = {
  product: {
    partnumber: string;
    name: string;
    description: string;
    longDescription: string;
  };
};
