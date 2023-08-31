/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ReviewList, ReviewSummary } from '@exo/frontend-components-commerce';
import React from 'react';
import * as S from './ProductReviews.styles';
import { AddProductReviews } from './AddProductReview';

export const ProductReviews = ({ product }: Props) => {
  return (
    <S.ProductReviews>
      <S.ReviewSummary>
        <ReviewSummary 
          rating={product.reviews.edges.map(e=>e.node.rating).reduce((a, b) => a + b, 0)/product.reviews.edges.length}
          reviewCount={{
            1: product.reviews.edges.filter(e => e.node.rating >= 0 && e.node.rating < 20).length,
            2: product.reviews.edges.filter(e => e.node.rating >= 20 && e.node.rating < 40).length,
            3: product.reviews.edges.filter(e => e.node.rating >= 40 && e.node.rating < 60).length,
            4: product.reviews.edges.filter(e => e.node.rating >= 60 && e.node.rating < 80).length,
            5: product.reviews.edges.filter(e => e.node.rating >= 80 && e.node.rating < 100).length
          }}
        />
        <AddProductReviews product={product}></AddProductReviews>
      </S.ReviewSummary>
      <S.ReviewList>
        <ReviewList
          reviews={product.reviews.edges.slice(0, 3).map(e => ({
            name: e.node.name,
            location: e.node.userLocation,
            title: e.node.title,
            stars: e.node.rating / 20,
            avatar: e.node.avatar,
            review: e.node.text ?? 'None'
          }))}
        />
      </S.ReviewList>
    </S.ProductReviews>
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
