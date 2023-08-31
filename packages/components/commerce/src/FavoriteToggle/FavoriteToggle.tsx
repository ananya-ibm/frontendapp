/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './FavoriteToggle.styles';

export const FavoriteToggle = ({
  id = 'favorite',
  label = 'Favorite',
  onChange = () => {}
}: Props) => {
  return (
    <S.Label htmlFor={id}>
      <S.ScreenReaderText>{label}</S.ScreenReaderText>
      <S.Input
        id={id}
        type="checkbox"
        onChange={e => {
          onChange(e.target.checked);
        }}
      />
      <S.Icon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        fill="#FFF"
        stroke="#555"
        strokeWidth="4"
      >
        <path d="M25 11C8.1-1-11.8 24 25 44c36.8-20 16.9-45 0-33z" />
      </S.Icon>
    </S.Label>
  );
};

type Props = {
  id?: string;
  label?: string;
  onChange?: (state: boolean) => void;
};
