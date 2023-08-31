/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Stack.styles';

export const Stack = ({
  size = 'xs',
  orientation = 'vertical',
  justify = 'start',
  children
}: Props) => {
  return (
    <S.Stack size={size} orientation={orientation} justify={justify}>
      {children}
    </S.Stack>
  );
};

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  orientation?: 'vertical' | 'horizontal';
  justify?: 'start' | 'end' | 'between';
  children?: any;
};
