/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/prop-types */

import React from 'react';
import { SkeletonLine, MonetaryAmount } from '@exo/frontend-components-core';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { MonetaryAmount as TMonetaryAmount } from '@exo/frontend-features-catalog-logic';
import * as S from './ProductBundleOverview.styles';

// TODO: Convert this to a grid
export const ProductBundleOverview = ({ product }: Props) => {
  return (
    <S.ProductBundleOverview>
      <S.Wrapper>
        {product.children.map(b => (
          <S.BundleComponent key={b.name}>
            <S.Thumbnail src={getClientImagePath(b.thumbnail)} />
            <S.Info>
              <S.ProductName>{b.name}</S.ProductName>

              <S.Price>
                <MonetaryAmount priceObject={b.price} />
              </S.Price>
            </S.Info>
          </S.BundleComponent>
        ))}
      </S.Wrapper>
    </S.ProductBundleOverview>
  );
};

type Props = {
  product: {
    children: {
      name: string;
      thumbnail: string;
      price: {
        list: TMonetaryAmount;
        offer: TMonetaryAmount;
      };
    }[];
  };
};

ProductBundleOverview.Skeleton = () => {
  return (
    <S.ProductBundleOverview>
      <S.Wrapper>
        {[0, 1, 2].map(b => (
          <S.BundleComponent key={`sk_${b}`}>
            <S.Thumbnail src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAAEElEQVR42mP88J8BCBghFAAi4gPhKRu9/AAAAABJRU5ErkJggg==" />
            <S.Info>
              <S.ProductName>
                <SkeletonLine />
              </S.ProductName>

              <S.Price>
                <SkeletonLine />
              </S.Price>
            </S.Info>
          </S.BundleComponent>
        ))}
      </S.Wrapper>
    </S.ProductBundleOverview>
  );
};
