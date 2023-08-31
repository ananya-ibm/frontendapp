/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import * as S from './LayoutSpacing.styles';

export const LAYOUT_SIZE = { XS: 'xs', MD: 'md', SM: 'sm', XL: 'xl', '2XL': '2xl' };

export const LayoutSpacing = ({ size }: Props) => {
  switch (size) {
    case LAYOUT_SIZE.XS:
      return <S.SpacerXs />;
    case LAYOUT_SIZE.XL:
      return <S.SpacerXl />;
    case '2xl':
      return <S.Spacer2xl />;
    case LAYOUT_SIZE.MD:
      return <S.SpacerMd />;
    case LAYOUT_SIZE.SM:
    default:
      return <S.SpacerSm />;
  }
};

type Props = {
  size: 'xs' | 'sm' | 'md' | 'xl' | '2xl';
};
