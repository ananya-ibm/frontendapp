/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './DetailCase.styles';
import { Button } from '@exo/frontend-components-base';
import { Check,LayoutSpacing } from '@exo/frontend-components-core';

export const DetailCase = ({
  subTitle = "Benefits",
  title= 'Lorem ipsum',
  body1 ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  body2 = "Lorem ipsum dolor sit amet.",
  body3 = "Lorem ipsum dolor sit amet.",
  body4 = "Lorem ipsum dolor sit amet.",
  body5 = "Lorem ipsum dolor sit amet.",
  body6 = "Lorem ipsum dolor sit amet.",
  ctaText = 'CTA text',
  ctaLink,
  image,
  imagePosition = 'right',
  background = 'white',
  color
}: Props) => {
  return <S.DetailCase imagePosition={imagePosition} color={color} background={background}>
    <S.Image><img src={image} /></S.Image>
    <S.Content>

      <S.Title>{title}</S.Title>
      <S.Body>{body1}</S.Body>      {subTitle && <S.Subtitle>{subTitle}</S.Subtitle>}
      <S.Body><Check/> {body2}</S.Body>
      <S.Body><Check/> {body3}</S.Body>  
      <S.Body><Check/> {body4}</S.Body>  
      <S.Body><Check/> {body5}</S.Body>  
      <S.Body><Check/> {body6}</S.Body>
      <LayoutSpacing size="sm" />   
      <S.CTA>
        <Button onClick={() => window.location.replace(ctaLink)}
                  label={ctaText} />
                  </S.CTA>
    </S.Content>
  </S.DetailCase>;
}

type Props = {
  subTitle?: string;
  title: string;
  body1: string;
  body2: string;
  body3: string;
  body4: string;
  body5: string;
  body6: string;
  ctaText: string;
  ctaTextMobile?: string;
  ctaLink: string;
  image: string;
  imagePosition?: 'left' | 'right';
  background?: string;
  color?: string;
};
