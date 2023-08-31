/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AncillaryPackage } from '@exo/frontend-features-travel-ancillary-page-logic';
import * as S from '../FareBundleCard/FareBundleCard.styles';

export const FareBundleHeader = ({
  title,
  description,
  price,
  currency,
  handleSelectPack,
  handleSelectCustom,
  travelPack
}: Props) => {
  const handleClick = () => {
    travelPack ? handleSelectPack && handleSelectPack(travelPack) : handleSelectCustom && handleSelectCustom();
  };

  return (
    <>
      <S.BundleHeader onClick={handleClick}>
        <S.BundleHeaderTitleContainer>
          <S.BundleHeaderTitle>{title}</S.BundleHeaderTitle>
          <S.BundleHeaderSubtitle>{description}</S.BundleHeaderSubtitle>
        </S.BundleHeaderTitleContainer>
        <S.BundleHeaderDetails>
          <S.BundlePriceContainer>
            <S.BundlePrice>{`+${price} ${currency}`}</S.BundlePrice>
          </S.BundlePriceContainer>
          <S.BundleHeaderDetailsIcon />
        </S.BundleHeaderDetails>
      </S.BundleHeader>
    </>
  );
};

type Props = {
  title?: string;
  description?: string;
  price?: number;
  currency: string;
  handleSelectPack?: (travelPack: AncillaryPackage) => void;
  handleSelectCustom?: () => void;
  travelPack?: AncillaryPackage;
};