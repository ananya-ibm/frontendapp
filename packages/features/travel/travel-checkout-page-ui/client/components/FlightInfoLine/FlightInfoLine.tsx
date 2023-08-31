/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './FlightInfoLine.styles';
import { formatDate } from '@exo/frontend-components-travel';
import { FlightInfo } from '@exo/frontend-features-travel-flights-page-logic';
import { Flight } from '@exo/frontend-features-travel-ancillary-page-ui';
import { useMemo } from 'react';

// This is where the class options are defined. They have the following format: 'class query value': 'class name to display'
const classMap = {
  ECONOMY: 'Economy',
  PREMIUM_ECONOMY: 'Premium Economy',
  BUSINESS: 'Business',
  FIRST: 'First Class'
};

export const FlightInfoLine = React.memo(
  ({ className, type = '1-way', flightInfo, displayFlight }: Props) => {

    const flightClass = useMemo(
      () => flightInfo?.travelClass.map(c => classMap[c]).join(', '),
      [flightInfo]
    );

    const flightLabel = useMemo(() => {
      switch (type) {
        case 'outbound':
          return 'Outbound:';
        case 'return':
          return 'Return:';
        case '1-way':
          return '';
        default:
          return '';
      }
    }, [type]);

    return (
      <S.FlightInfoLine className={className}>
        {flightLabel && <S.FlightInfoSegment text={flightLabel} />}
        {(type === 'outbound' || type === '1-way') && (
          <S.FlightInfoSegment
            type="date"
            text={flightInfo?.departureDate ? `${formatDate(flightInfo?.departureDate)}` : ''}
          />
        )}
        {type === 'return' && (
          <S.FlightInfoSegment
            type="date"
            text={flightInfo?.returnDate ? `${formatDate(flightInfo?.returnDate)}` : ''}
          />
        )}
        <S.FlightInfoSegment
          type="time"
          text={`${displayFlight?.departure.time}${
            flightInfo?.returnDate ? ' - ' + displayFlight?.arrival.time : ''
          }`}
        />
        <S.FlightInfoSegment type="passengers" text={flightInfo?.passengerCount} />
        <S.FlightInfoSegment type="class" text={flightClass} />
      </S.FlightInfoLine>
    );
  }
);

type Props = {
  className?: string;
  type?: 'outbound' | 'return' | '1-way';
  flightInfo?: FlightInfo;
  displayFlight?: DisplayFlight;
};

export type DisplayFlight = Flight | null;