/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as S from './FlightJourney.styles';

export const FlightJourney = ({
  departureAirport,
  arrivalAirport,
  type = '1-way',
  className,
  price
}: Props) => {
  return (
    <S.JourneyContainer>
      <S.Journey className={className}>
        {departureAirport && <S.Airport>{departureAirport}</S.Airport>}
        {departureAirport && arrivalAirport && type === '2-way' ? <S.ArrowBothWays /> : <S.Arrow />}
        {arrivalAirport && <S.Airport>{arrivalAirport}</S.Airport>}
      </S.Journey>
      <S.Price>{price}</S.Price>
    </S.JourneyContainer>
  );
};

type Props = {
  departureAirport?: string;
  arrivalAirport?: string;
  type?: '1-way' | '2-way';
  className?: string;
  price?: string;
};