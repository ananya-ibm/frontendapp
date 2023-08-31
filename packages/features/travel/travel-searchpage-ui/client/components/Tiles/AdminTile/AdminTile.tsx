/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import * as S from '../Tiles.styles';

type Props = {
  text: string;
};

export const AdminTile = ({ text }: Props) => {
  return (
    <S.ClickTile>
      <S.Info>
        <S.TopInfo>
          <span>{text}</span>
        </S.TopInfo>
      </S.Info>
      <S.ChevronIcon />
    </S.ClickTile>
  );
};
