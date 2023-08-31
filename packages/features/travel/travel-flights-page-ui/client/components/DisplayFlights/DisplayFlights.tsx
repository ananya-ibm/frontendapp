/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { useEffectOnce } from '@exo/frontend-common-hooks';
import * as S from './DisplayFlights.styles';
import { FlightDetails } from '@exo/frontend-components-travel';
import { FlightCard, FlightData } from '../../components/FlightCard/FlightCard';
import { FlightSort } from '../../components/FlightSort/FlightSort';
import {
  DisplayFlightsContainerRenderLoadingProps,
  DisplayFlightsContainerRenderProps
} from '@exo/frontend-features-travel-flights-page-logic';
import { useHistory } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useFlightFromCT } from '@exo/frontend-features-travel-flights-page-logic';
import { useCart } from '@exo/frontend-features-travel-checkout-page-logic';

// TODO - use currency adapter
const currencyMap = {
  EUR: '€'
};

const formatPrice = (price: number, currency: string) =>
  `${currencyMap[currency]}${price.toLocaleString('en-US')}`;
const getTimeFromDate = (date: string) =>
  `${new Date(date).getHours()}:${
    new Date(date).getMinutes().toString().length === 1
      ? '0' + new Date(date).getMinutes().toString()
      : new Date(date).getMinutes()
  }`;

export const DisplayFlights = ({ flights: fetchedFlights, flightInfo }: Props) => {
  const eventContext = useEventContext();
  const history = useHistory();
  const session = useSessionContext();
  const cart = useCart();
  const { getFlightsFromCT, data: queryResult } = useFlightFromCT();

  const [flights, setFlights] = useState<any[]>([]);
  const [flightsFromCT, setFlightsFromCT] = useState<FlightsFromCT[]>([]);
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightData>();

  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Search page' });
  });

  useEffect(() => {
    if (fetchedFlights) {
      setFlights(fetchedFlights);
    }
  }, [fetchedFlights]);

  useEffect(() => {
    //variables hardcoded for now untild further solution
    getFlightsFromCT({ variables: { filter: { term: 'oneway' }, currency: 'EUR', country: 'US' } });
    if (queryResult) {
      setFlightsFromCT(queryResult?.products?.edges);
    }
  }, [queryResult]);

  const handleClick = async () => {
    if (selectedFlight) {
      if (flightsFromCT.length > 0) {
        const selectedFlightIATA = `${selectedFlight.leavingFlight.departure.airport}-${selectedFlight.leavingFlight.arrival.airport}`;

        const selectedFlightFromCT = flightsFromCT.find(
          flight => flight.node.name.slice(0, 7) === selectedFlightIATA
        );

        if (session.flightInfo?.returnDate !== null) {
          const flightForCart = {
            id: '53bbbb03-7ecd-4233-be2a-242d10f860a9',
            quantity: 1
          };
          const add = await cart.add(session.cartId, flightForCart);

          if (add) {
            history.push('/travel/travel-ancillary');
            session.set({ ...session, selectedFlight });
          }
        } else if (selectedFlightFromCT) {
          const flightForCart = {
            id: selectedFlightFromCT?.node.id,
            quantity: 1
          };
          const add = await cart.add(session.cartId, flightForCart);

          if (add) {
            history.push('/travel/travel-ancillary');
            session.set({ ...session, selectedFlight });
          }
        }
      }
    }
  };

  useEffect(() => {
    const map = flights.map(flight => {
      const flightData: FlightData = {
        price: formatPrice(flight.price.grandTotal, flight.price.currency),
        leavingFlight: {
          flightNo: flight.itineraries[0].segments[0].number, // TODO - adapt for flights with multiple segments
          flightDetails: `These are the flight details of the flight represented in this card`,
          departure: {
            time: getTimeFromDate(flight.itineraries[0].segments[0].departure.at),
            airport: flight.itineraries[0].segments[0].departure.iataCode
          },
          arrival: {
            time: getTimeFromDate(flight.itineraries[0].segments[0].arrival.at),
            airport: flight.itineraries[0].segments[0].arrival.iataCode
          },
          flightDuration: flight.itineraries[0].duration
        },
        returningFlight: !flight.itineraries[1]
          ? null
          : {
              flightNo: flight.itineraries[1].segments[0].number, // TODO - adapt for flights with multiple segments
              flightDetails: `These are the flight details of the flight represented in this card`,
              departure: {
                time: getTimeFromDate(flight.itineraries[1].segments[0].departure.at),
                airport: flight.itineraries[1].segments[0].departure.iataCode
              },
              arrival: {
                time: getTimeFromDate(flight.itineraries[1].segments[0].arrival.at),
                airport: flight.itineraries[1].segments[0].arrival.iataCode
              },
              flightDuration: flight.itineraries[1].duration
            }
      };
      const cardKey = `flightsPage-flightCard-${flightData.leavingFlight.flightNo}${
        '-' + flightData.returningFlight?.flightNo ?? 'noReturn'
      }`;
      return (
        <FlightCard setSelectedFlight={setSelectedFlight} flightData={flightData} key={cardKey} />
      );
    });
    setCards(map);
  }, [flights]);

  return (
    <S.DisplayFlights>
      {flightInfo && (
        <FlightDetails
          departureAirport={`${flightInfo.originLocationCity}, ${flightInfo.originLocationCode}`}
          arrivalAirport={`${flightInfo.destinationLocationCity}, ${flightInfo.destinationLocationCode}`}
          flightClasses={flightInfo.travelClassesString}
          noOfPassengers={flightInfo.passengerCount}
          departureDate={flightInfo.departureDate}
          returnDate={flightInfo.returnDate}
        />
      )}
      <FlightSort flights={flights} setFlights={setFlights} />

      {flights.length === 0 ? (
        <S.NoFlights>We are sorry, but there are no flights available.</S.NoFlights>
      ) : (
        <S.Flights>
          <S.FlightsContainer>{cards}</S.FlightsContainer>
        </S.Flights>
      )}
      <S.ConfirmButton>
        <S.FindFlightButton
          variant="primary"
          label="Select flight"
          iconPosition="left"
          onClick={handleClick}
        />
      </S.ConfirmButton>
    </S.DisplayFlights>
  );
};

type Props = DisplayFlightsContainerRenderProps;

DisplayFlights.Skeleton = ({
  flightType,
  flightInfo
}: DisplayFlightsContainerRenderLoadingProps) => {
  return (
    <S.DisplayFlights>
      {flightInfo && (
        <FlightDetails
          departureAirport={`${flightInfo.originLocationCity}, ${flightInfo.originLocationCode}`}
          arrivalAirport={`${flightInfo.destinationLocationCity}, ${flightInfo.destinationLocationCode}`}
          flightClasses={flightInfo.travelClassesString}
          noOfPassengers={flightInfo.passengerCount}
          departureDate={flightInfo.departureDate}
          returnDate={flightInfo.returnDate}
        />
      )}
      <FlightSort flights={[]} setFlights={() => {}} />
      <S.Flights>
        <S.FlightsContainer>
          {flightType === '2-way' && (
            <S.SkeletonWrapper>
              <S.Skeleton />
              <S.Skeleton />
              <S.Skeleton />
            </S.SkeletonWrapper>
          )}
          {flightType === '1-way' && (
            <S.SkeletonWrapper>
              <S.SkeletonOneWay />
              <S.SkeletonOneWay />
              <S.SkeletonOneWay />
            </S.SkeletonWrapper>
          )}
        </S.FlightsContainer>
      </S.Flights>
    </S.DisplayFlights>
  );
};

type FlightsFromCT = {
  node: {
    id: string;
    name: string;
    description: string;
    partnumber: string;
  };
};