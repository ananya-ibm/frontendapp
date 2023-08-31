/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './FormHeader.styles';

export const FormHeader = ({ children }: { children: any }) => {
  return <S.FormHeader>{children}</S.FormHeader>;
};
