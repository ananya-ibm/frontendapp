/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Bleed.styles';

export const Bleed = ({ removeTop, className, children }: Props) => {
  return (
    <S.Bleed className={className} removeTop={removeTop}>
      {children}
    </S.Bleed>
  );
};

type Props = {
  removeTop?: 'xs' | 'sm' | 'xl' | '2xl';
  className?: string;
  children?: any;
};
