/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { ComponentType } from 'react';
import * as S from '../Tiles.styles';

export const TravelPackageTile = ({ name, icon }: Props) => {
  return (
    <>
      <S.TravelPackageOptionTile>
        <S.TileInfoContainer>
          <S.Icon as={icon} />
          <S.TileInfo>{name}</S.TileInfo>
        </S.TileInfoContainer>
      </S.TravelPackageOptionTile>
    </>
  );
};

type Props = {
  name: string;
  icon?: ComponentType<object>;
};
