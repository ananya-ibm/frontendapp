/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './FlightDetails.styles';

const monthMap = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
};

export const formatDate = (s: string) => {
  const date = new Date(s);
  return `${date.getDate()} ${monthMap[date.getMonth()]}`;
};

export const FlightDetails = React.memo(
  ({
    departureAirport,
    arrivalAirport,
    departureDate,
    returnDate,
    flightClasses,
    noOfPassengers,
    isAncillaryPage,
    leavingFlight,
    returningFlight,
    price
  }: Props) => {
    const history = useHistory();
    const classesLabel = useMemo(
      () => (flightClasses?.includes(',') ? flightClasses?.slice(0, 10) + '...' : flightClasses),
      [flightClasses]
    );
    return (
      <>
        {isAncillaryPage ? (
          <S.FlightDetails>
            <S.DataWrapper>
              <S.Data>
                <S.FlightJourney
                  departureAirport={departureAirport}
                  arrivalAirport={arrivalAirport}
                  type={returnDate ? '2-way' : '1-way'}
                />

                <S.SearchParams>
                  {returningFlight ? (
                    <>
                      <S.FlightInfoSegment text={'Outbound:'} />
                      <S.FlightInfoSegment
                        type="date"
                        text={departureDate ? formatDate(departureDate) : ''}
                      />
                      <S.FlightInfoSegment
                        type="time"
                        text={`${
                          leavingFlight?.departure.time ? leavingFlight?.departure.time : ''
                        }${leavingFlight?.arrival.time ? ` - ${leavingFlight?.arrival.time}` : ''}`}
                      />
                    </>
                  ) : (
                    <>
                      <S.FlightInfoSegment
                        type="date"
                        text={departureDate ? formatDate(departureDate) : ''}
                      />
                      <S.FlightInfoSegment
                        type="time"
                        text={`${
                          leavingFlight?.departure.time ? leavingFlight?.departure.time : ''
                        }${leavingFlight?.arrival.time ? ` - ${leavingFlight?.arrival.time}` : ''}`}
                      />
                    </>
                  )}
                </S.SearchParams>
              </S.Data>

              {returningFlight && (
                <>
                  <S.FlightInfoSegment text={'Return:'} />
                  <S.FlightInfoSegment
                    type="date"
                    text={returnDate ? formatDate(returnDate) : ''}
                  />
                  <S.FlightInfoSegment
                    type="time"
                    text={`${
                      returningFlight?.departure.time ? returningFlight?.departure.time : ''
                    }${returningFlight?.arrival.time ? ` - ${returningFlight?.arrival.time}` : ''}`}
                  />
                </>
              )}
            </S.DataWrapper>
            <S.PriceWrapper>
              <S.Price>{price}</S.Price>
            </S.PriceWrapper>
          </S.FlightDetails>
        ) : (
          <S.FlightDetails>
            <S.Data>
              <S.FlightJourney
                departureAirport={departureAirport}
                arrivalAirport={arrivalAirport}
                type={returnDate ? '2-way' : '1-way'}
              />

              <S.SearchParams>
                <S.FlightInfoSegment
                  type="date"
                  text={`${departureDate ? formatDate(departureDate) : ''}${
                    returnDate ? ` - ${formatDate(returnDate)}` : ''
                  }`}
                />

                {noOfPassengers && <S.FlightInfoSegment type="passengers" text={noOfPassengers} />}

                {flightClasses && <S.FlightInfoSegment type="passengers" text={classesLabel} />}
              </S.SearchParams>
            </S.Data>
            <S.Button
              label="Change"
              onClick={() => history.push('/travel/travel-searchpage')}
              variant="link"
            />
          </S.FlightDetails>
        )}
      </>
    );
  }
);

export type Flight = {
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
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string | null;
  returnDate?: string | null;
  leavingFlight?: Flight;
  returningFlight?: Flight | null;
  flightClasses?: string;
  noOfPassengers?: number;
  isAncillaryPage?: boolean;
  price?: string;
};