/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ContentList.styles';

export const ContentList = ({ children }: Props) => {
  return <S.ContentList>{children}</S.ContentList>;
}

type Props = {
  children?: any;
}