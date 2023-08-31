/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './HeroPageTitle.styles';

export const HeroPageTitle = ({ image, background, foreground, children, title }: Props) => {
  return (
    <S.HeroPageTitle image={image} background={background} foreground={foreground}>
      {title && <S.Title>{title}</S.Title>}
      {children}
    </S.HeroPageTitle>
  );
};

type Props = {
  children?: any;
  background?: string;
  foreground?: string;
  image?: string;
  title?: string;
};
