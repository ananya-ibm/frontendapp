/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Stars } from '../Stars/Stars';
import * as S from './ReviewSummary.styles';

export const ReviewSummary = ({ reviewCount, rating = 3  }: Props) => {
  const total = reviewCount[1] + reviewCount[2] + reviewCount[3] + reviewCount[4] + reviewCount[5];
  
  return (
    <S.ReviewSummary>
      <S.Title>Customer Reviews</S.Title>
      <S.Summary>
        <S.SummaryStars>
          <Stars totalStars={5} rating={rating} />    
        </S.SummaryStars>
        <S.SummaryText>Based on {total} reviews</S.SummaryText>
      </S.Summary>
      <S.Details>
        {[1, 2, 3, 4, 5].map(idx => (
          <S.Detail key={idx}>
            <S.StarCount>{idx}</S.StarCount>
            <S.Star />
            <S.Graph>
              <S.Bar percentage={100 * (reviewCount[idx] / total)} />
            </S.Graph>
            <S.ValueLabel>{Math.round(100 * (reviewCount[idx] / total))}%</S.ValueLabel>
          </S.Detail>
        ))}
      </S.Details>
    </S.ReviewSummary>
  );
};

type Props = {
  reviewCount: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  rating?: number;
};
