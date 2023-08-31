/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Stars } from '../Stars/Stars';
import * as S from './ReviewList.styles';

export const ReviewList = ({ reviews }: Props) => {
  return (
    <S.ReviewList>
      {reviews.map(r => (
        <S.Review key={r.review}>
          <S.Avatar src={r.avatar} />
          <S.Name>
            {r.name ?? 'Anonymous'}
            {r.location && <S.Location> from {r.location}</S.Location>}
          </S.Name>
          <S.Stars>
            <Stars totalStars={5} rating={100 * (r.stars / 5)} />
          </S.Stars>
          <S.ReviewText>
            {r.title && <h5>{r.title}</h5>}
            {r.review}
          </S.ReviewText>
        </S.Review>
      ))}
    </S.ReviewList>
  );
};

type Props = {
  reviews: {
    name?: string;
    location?: string;
    avatar?: string;
    stars: number;
    review?: string;
    title?: string;
  }[];
};
