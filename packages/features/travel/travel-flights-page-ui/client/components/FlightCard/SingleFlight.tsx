/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { FlightJourneyIcon } from '../FlightJourneyIcon/FlightJourneyIcon';
import { MatchIcon } from '../MatchIcon/MatchIcon';
import * as S from './FlightCard.styles';

export const SingleFlight = ({ flight, preferenceMatch }: Props) => {
  return (
    <S.FlightData>
      <S.DataLeft>
        <S.TravelDataTop>
          <S.Time>{flight.departure.time}</S.Time>
          <S.FlightIconWrapper>
            <FlightJourneyIcon />
          </S.FlightIconWrapper>
          <S.Time>{flight.arrival.time}</S.Time>
        </S.TravelDataTop>
        <S.TravelDataBottom>
          <S.IATA>{flight.departure.airport}</S.IATA>
          <S.Duration>{flight.flightDuration}</S.Duration>
          <S.IATA>{flight.arrival.airport}</S.IATA>
        </S.TravelDataBottom>
      </S.DataLeft>
      <S.DataRight>
        <S.MatchIconWrapper>
          <MatchIcon variant={preferenceMatch} isVisible={preferenceMatch ? true : false} />
        </S.MatchIconWrapper>
        <S.FlightNo>{flight.flightNo}</S.FlightNo>
      </S.DataRight>
    </S.FlightData>
  );
};

export type SingleFlightProps = {
  flightNo: string;
  flightDetails: string;
  departure: {
    time: string;
    airport: string;
  };
  arrival: {
    time: string;
    airport: string;
  };
  flightDuration: string;
};

type Props = {
  flight: SingleFlightProps;
  preferenceMatch?: PreferenceMatch;
};

export type PreferenceMatch = 'bestMatch' | 'closeMatch';