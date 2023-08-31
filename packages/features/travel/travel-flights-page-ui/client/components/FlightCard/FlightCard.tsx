/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import * as S from './FlightCard.styles';
import { PreferenceMatch, SingleFlight, SingleFlightProps } from './SingleFlight';

export const FlightCard = ({ flightData, setSelectedFlight, preferenceMatch }: Props) => {
  const [grayOut, setGrayOut] = useState(false);
  const handleClick = useCallback(() => {
    setSelectedFlight(prev => ({ ...prev, ...flightData }));
    setGrayOut(s => !s);
  }, []);

  return (
    <S.FlightCard onClick={handleClick} grayOut={grayOut ? grayOut : false}>
      <SingleFlight flight={flightData.leavingFlight} preferenceMatch={preferenceMatch} />
      {flightData.returningFlight && (
        <SingleFlight flight={flightData.returningFlight} preferenceMatch={preferenceMatch} />
      )}
      <S.BottomContainer>
        <S.Tile
          tileCollapsedIconText="See flight details"
          tileExpandedIconText="Hide flight details"
        >
          <S.AboveData>
            <S.TileContent>Show flight details</S.TileContent>
          </S.AboveData>
          <S.BelowData>
            <S.TileContent>{flightData.leavingFlight.flightDetails}</S.TileContent>
          </S.BelowData>
        </S.Tile>
        <S.Price>{flightData.price}</S.Price>
      </S.BottomContainer>
    </S.FlightCard>
  );
};

type Props = {
  flightData: FlightData;
  setSelectedFlight: Dispatch<SetStateAction<FlightData | undefined>>;
  preferenceMatch?: PreferenceMatch;
};

export type FlightData = {
  leavingFlight: SingleFlightProps;
  returningFlight: SingleFlightProps | null;
  price: string;
};