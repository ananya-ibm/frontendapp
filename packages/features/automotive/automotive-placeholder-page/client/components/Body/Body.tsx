/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './Body.styles';
import React from 'react';

export const Body = ({ text }: Props) => {
  return (
    <S.Body>
      {text}
    </S.Body>
  );
};

type Props = {
  text: string;
};
