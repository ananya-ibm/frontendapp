/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './DetailsGrid.styles';

export const DetailsGrid = ({ details }: Props) => {
  return (
    <S.DetailsGrid>
      {details?.length > 0 &&
        details.map(d => (
          <S.Detail key={d.title}>
            <S.Title>{d.title}</S.Title>
            <span>{d.value}</span>
          </S.Detail>
        ))}
    </S.DetailsGrid>
  );
};

type Props = {
  details: { title: string; value: string }[];
};
