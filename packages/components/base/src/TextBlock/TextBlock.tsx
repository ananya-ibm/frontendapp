/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './TextBlock.styles';

export const TextBlock = ({ children, className }: Props) => {
  return <S.TextBlock className={className}>{children}</S.TextBlock>;
};

type Props = {
  children: any;
  className?: string;
};
