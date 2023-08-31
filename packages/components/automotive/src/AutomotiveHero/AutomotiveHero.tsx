/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './AutomotiveHero.styles';

export const AutomotiveHero = ({
  backgroundColor = '#222',
  description,
  imgSrc,
  textColor = '#fff',
  title,
  children
}: Props) => (
  <S.AutomotiveHero backgroundColor={backgroundColor}>
    <S.Banner>
      <S.Image image={imgSrc} />
      <S.Content>
        <S.Title textColor={textColor}>{title}</S.Title>
        {description && <S.Description textColor={textColor}>{description}</S.Description>}
        {children && <S.Button>{children}</S.Button>}
      </S.Content>
    </S.Banner>
  </S.AutomotiveHero>
);

type Props = {
  backgroundColor?: string;
  description?: string;
  imgSrc?: string;
  textColor?: string;
  title: string;
  children?: any;
};
