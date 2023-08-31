/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Card, CardTitle, CardSection } from '@exo/frontend-components-base';
import * as S from './OwnerOverview.styles';

export const OwnerOverview = ({
  title,
  description,
  distance,
  reviewDate,
  insuranceDate,
  year,
  weight
}: Props) => {
  return (
    <>
      <Card>
        <CardTitle primaryAction={{ label: 'Edit', onClick: () => {} }}>{title}</CardTitle>
        <CardSection>
          <S.Description>{description}</S.Description>
        </CardSection>
        <CardSection type="secondary">
          <S.Specs>
            <S.SpecRow>
              <S.Spec>Total Distance</S.Spec>
              <S.Data>{distance}</S.Data>
            </S.SpecRow>
            <S.SpecRow>
              <S.Spec>Car Review</S.Spec>
              <S.Data>{reviewDate}</S.Data>
            </S.SpecRow>
            <S.SpecRow>
              <S.Spec>Car Insurance</S.Spec>
              <S.Data>{insuranceDate}</S.Data>
            </S.SpecRow>
            <S.SpecRow>
              <S.Spec>Year</S.Spec>
              <S.Data>{year}</S.Data>
            </S.SpecRow>
            <S.SpecRow>
              <S.Spec>Weight</S.Spec>
              <S.Data>{weight}</S.Data>
            </S.SpecRow>
          </S.Specs>
        </CardSection>
      </Card>
    </>
  );
};

type Props = {
  title?: string;
  description?: string;
  distance?: string;
  reviewDate?: string;
  insuranceDate?: string;
  year?: string;
  weight?: string;
};
