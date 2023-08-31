/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './DynamicVehicleImage.styles';

export const DynamicVehicleImage = ({
  images,
  backgroundColour,
  backgroundImage,
  percentSize = 100
}: Props) => {
  return (
    <S.DynamicVehicleImage backgroundColour={backgroundColour} backgroundImage={backgroundImage}>
      {images?.map(img => (
        <S.DynamicImage key={img} percentSize={percentSize} bgImg={img} />
      ))}
    </S.DynamicVehicleImage>
  );
};

type Props = {
  images?: string[];
  backgroundColour?: string;
  backgroundImage?: string;
  percentSize?: number;
};
