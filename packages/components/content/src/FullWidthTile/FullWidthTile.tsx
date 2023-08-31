/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import React from 'react';
import * as S from './FullWidthTile.styles';

export const FullWidthTile = ({
  subTitle,
  title,
  body,
  ctaText,
  ctaTextMobile,
  ctaLink,
  image,
  imagePosition = 'left',
  background,
  color
}: Props) => {
  return <S.FullWidthTile imagePosition={imagePosition} color={color} background={background}>
    <S.Image><img src={image} /></S.Image>
    <S.Content>
      {subTitle && <S.Subtitle>{subTitle}</S.Subtitle>}
      <S.Title>{title}</S.Title>
      <S.Body>{body}</S.Body>
      <S.CTA><Button label={ctaText} variant="tertiary" href={ctaLink} /></S.CTA>
      <S.CTAMobile><Button label={ctaTextMobile ?? ctaText} variant="tertiary" href={ctaLink} /></S.CTAMobile>
    </S.Content>
  </S.FullWidthTile>;
}

type Props = {
  subTitle?: string;
  title: string;
  body: string;
  ctaText: string;
  ctaTextMobile?: string;
  ctaLink: string;
  image: string;
  imagePosition?: 'left' | 'right';
  background?: string;
  color?: string;
};