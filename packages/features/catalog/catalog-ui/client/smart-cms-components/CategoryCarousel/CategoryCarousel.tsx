/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductItemCarousel } from '@exo/frontend-components-commerce';
import { CategoryListingContainer, CategoryRef } from '@exo/frontend-features-catalog-logic';

export const CategoryCarousel = ({ catId, ctaText, ctaLink }: Props) => {
  if (!catId) return <></>;

  const ref = new CategoryRef({ id: catId, slug: catId });
  return (
    <CategoryListingContainer
      /* TODO: Find a way to get the currency config */
      currency={'USD'}
      categoryId={ref}
      render={({ productData }) => (
        <ProductItemCarousel
          productData={productData}
          ctaText={ctaText}
          ctaLink={ctaLink}
        />
      )}
    />
  );
};

type Props = {
  catId: string;
  ctaText?: string;
  ctaLink?: string;
}