/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { ComponentType } from 'react';
import * as S from '../Tiles.styles';

export const CustomAncillaryTile = ({ name, icon, isSelected, onSelect, price }: Props) => {
  return (
    <>
      <S.BundleOptionTile value={''} selected={isSelected} onClick={onSelect}>
        <S.TileInfoContainer>
          <S.Icon as={icon} />
          <S.TileInfo>
            {name}
            <S.TilePrice>{price}</S.TilePrice>
          </S.TileInfo>
        </S.TileInfoContainer>
      </S.BundleOptionTile>
    </>
  );
};

type Props = {
  name: string;
  icon?: ComponentType<object>;
  isSelected: boolean;
  onSelect: () => void;
  price: string;
};
