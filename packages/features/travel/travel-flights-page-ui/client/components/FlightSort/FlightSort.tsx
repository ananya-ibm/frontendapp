/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Layer } from '@exo/frontend-components-base';
import * as S from './FlightSort.styles';
import { FlightSortButton } from '@exo/frontend-components-travel';
import { Flight, Flights } from '@exo/frontend-features-travel-flights-page-logic';

const sortButtons = [
  {
    id: 'fastest',
    title: 'Fastest'
  },
  {
    id: 'cheapest',
    title: 'Cheapest'
  },
  {
    id: 'direct',
    title: 'Direct'
  }
];

//  Converts strings like "Xh XXm" to number of minutes; e.g. "2h 35m" to 155
const durationStringToMinutes = (duration: string) => {
  const timeArr = duration.split('h ').map(d => (d.includes('m') ? d.slice(0, d.length - 1) : d));
  const mins = +timeArr[0] * 60 + +timeArr[1];
  return mins;
};

//  TODO: The sorting logic should be moved to BE at a further point in time
const sort = ({ flights, setFlights, sortOption }: SortProps) => {
  const sortedFlights = [...flights];
  switch (sortOption) {
    case 'cheapest':
      sortedFlights.sort((a: Flight, b: Flight) => +a.price.grandTotal - +b.price.grandTotal);
      break;
    case 'direct':
      sortedFlights.sort((a: Flight, b: Flight) => {
        let segmentsA = 0;
        let segmentsB = 0;
        a.itineraries.forEach(itinerary => {
          segmentsA = segmentsA + itinerary.segments.length;
        });
        b.itineraries.forEach(itinerary => {
          segmentsB = segmentsB + itinerary.segments.length;
        });
        return segmentsA - segmentsB;
      });
      break;
    case 'fastest':
      sortedFlights.sort((a: Flight, b: Flight) => {
        let totalFlightDurationA = 0;
        let totalFlightDurationB = 0;
        a.itineraries.forEach(itinerary => {
          totalFlightDurationA = totalFlightDurationA + durationStringToMinutes(itinerary.duration);
        });
        b.itineraries.forEach(itinerary => {
          totalFlightDurationB = totalFlightDurationB + durationStringToMinutes(itinerary.duration);
        });
        return totalFlightDurationA - totalFlightDurationB;
      });
      break;
  }
  setFlights(sortedFlights);
};

export const FlightSort = ({ flights, setFlights }: Props) => {
  const [active, setActive] = useState<string>();

  const sortFlights = (id: string) => {
    setActive(id);
    sort({ flights, setFlights, sortOption: id });
  };

  return (
    <Layer>
      <S.FlightSortWrapper>
        <S.FlightSortContainer>
          <S.FlightSortTitle>Sort:</S.FlightSortTitle>

          {sortButtons.map((btn: { id: string; title: string }) => (
            <FlightSortButton
              key={`flightSort-button-${btn.id}`}
              id={btn.id}
              className={active === btn.id ? 'active' : undefined}
              onClick={() => sortFlights(btn.id)}
              title={btn.title}
            />
          ))}
        </S.FlightSortContainer>
      </S.FlightSortWrapper>
    </Layer>
  );
};

type Props = {
  flights: Flights;
  setFlights: Dispatch<SetStateAction<Flights>>;
};

type SortProps = Props & {
  sortOption: string;
};