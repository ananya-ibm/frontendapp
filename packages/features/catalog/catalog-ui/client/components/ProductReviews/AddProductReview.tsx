/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { ProductReviewForm } from './ProductReviewForm/ProductReviewForm';
import * as S from './AddProductReview.styles';

export const AddProductReviews = ({ product }: Props) => {
  const onClose = () => {};

  return (
    <S.ReviewSummary>
      <LayoutSpacing size="sm" />
      <LayoutSpacing size="sm" />
      <S.Title>Share your thoughts.</S.Title>
      <S.Summary>
        <S.SummaryText>
          {' '}
          If you have used this product. Share your thoughts with other customers.
        </S.SummaryText>
      </S.Summary>
      <S.Details>
        <div>
          <ProductReviewForm product={product} onClose={onClose} hideButtons />
        </div>
      </S.Details>
    </S.ReviewSummary>
  );
};
type Props = {
  product: {
    partnumber?: string;
    name: string;
    description: string;
    longDescription: string;
    reviews: {
      edges: {
        node: {
          id?: string;
          title?: string;
          text?: string;
          rating: number;
          featured?: boolean;
          recommeded?: boolean;
          userLocation?: string;
          updateDate?: string;
          name?: string;
          avatar?: string;
        };
      }[];
    };
  };
};
