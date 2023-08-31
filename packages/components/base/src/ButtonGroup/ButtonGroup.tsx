/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ButtonGroup.styles';

// Note: In Carbon the primary button is to the right
const asArray = (a: any) => (a instanceof Array ? [...a] : [a]);

export const ButtonGroup = ({ children, isLeft, isCompact = false, className }: Props) => {
  return (
    <S.ButtonGroup isLeft={isLeft} isCompact={isCompact} className={className}>
      {asArray(children).reverse()}
    </S.ButtonGroup>
  );
};

type Props = {
  children: any;
  isCompact?: boolean;
  isLeft?: boolean;
  className?: string;
};
