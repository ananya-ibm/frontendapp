/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import * as S from '../Tiles.styles';

type Props = {
  airport: string;
  location: string;
  iataCode: string;
  isStarred?: boolean;
  onClick: () => void;
};

export const AirportTile = ({ airport, location, iataCode, isStarred = false, onClick }: Props) => {
  return (
    <S.ClickTile onClick={onClick}>
      <S.StarIcon isvisible={isStarred ? 1 : 0} />
      <S.PlaneIcon />
      <S.Info>
        <S.TopInfo>
          <span>{airport}</span>
        </S.TopInfo>
        <S.BottomInfo>
          <span>{location}</span>
        </S.BottomInfo>
      </S.Info>
      <S.IATA>{iataCode}</S.IATA>
    </S.ClickTile>
  );
};
