/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ProductItemCarousel.styles';
import { ProductCard, ProductCardProductType } from '../ProductCard/ProductCard';
import { Button } from '@exo/frontend-components-base';

export const ProductItemCarousel = ({ productData = [], ctaText, ctaLink }: Props) => {
  return (
    <S.ProductItemCarousel>
      <S.Carousel>
        {productData.slice(0, 4).map((p) => (
          <ProductCard key={p.id} {...p} routeName="catalog/products" />
        ))}
      </S.Carousel>
      {ctaText && ctaLink && <S.CTA>
        <Button variant="tertiary" label={ctaText} href={ctaLink} />
      </S.CTA>}
    </S.ProductItemCarousel>
  );
};

type Props = {
  productData?: ProductCardProductType[];
  ctaText?: string;
  ctaLink?: string;
};
