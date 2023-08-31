/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Favorite } from '@carbon/react/icons';
import * as S from './FavoriteButton.styles';

export const FavoriteButton = ({ onChange = () => {}, id = 'test' }: Props) => {
  const [isSelected, setSelected] = useState(false);
  const toggleSelected = () => {
    onChange(id);
    setSelected(!isSelected);
  };

  return (
    <S.FavButton
      data-testid="FavoriteBtnTestId"
      role="button"
      tabIndex={0}
      onKeyPress={toggleSelected}
      onClick={toggleSelected}
    >
      {isSelected ? <S.FilledButton /> : <Favorite size={20} />}
    </S.FavButton>
  );
};

type Props = {
  onChange?: (id: string) => void;
  id?: string;
};
