/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Stars.styles';

export const Stars = ({ rating, reviews, totalStars }: Props) => {
  const stars = Math.floor((Number(rating) * totalStars) / 100);

  let emptyStars = [...Array(totalStars - stars).keys()];
  let filledStars = [...Array(stars).keys()];

  if (stars === 0) {
    emptyStars = [...Array(totalStars).keys()];
    filledStars = [];
  }

  return (
    <S.Stars>
      {filledStars && filledStars.map(star => <S.Star key={`star-${star}`} />)}
      {emptyStars && emptyStars.map(star => <S.EmptyStar key={`empty-star-${star}`} />)}
      {reviews && reviews > 0 && <span>({reviews})</span>}
    </S.Stars>
  );
};

type Props = {
  rating: number;
  reviews?: number;
  totalStars: number;
};
