/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useLazyQuery, gql } from '@apollo/client';
import { handleApolloError } from '@exo/frontend-common-apollo';

export const FlightSearchQuery = gql`
  query FlightSearch(
    $originLocationCode: String!
    $destinationLocationCode: String!
    $departureDate: String!
    $passengerCount: Int!
    $returnDate: String
    $directFlightOnly: Boolean
    $travelClass: [TravClass!]!
  ) {
    flightSearch(
      originLocationCode: $originLocationCode
      destinationLocationCode: $destinationLocationCode
      departureDate: $departureDate
      passengerCount: $passengerCount
      returnDate: $returnDate
      directFlightOnly: $directFlightOnly
      travelClass: $travelClass
    ) {
      price {
        grandTotal
        currency
      }
      itineraries {
        duration
        segments {
          departure {
            iataCode
            at
            terminal
          }
          arrival {
            iataCode
            at
          }
          number
        }
      }
    }
  }
`;

export const useFlightSearch = () => {
  const [getFlights, { called, loading, data, error }] = useLazyQuery(FlightSearchQuery, {
    // eslint-disable-next-line no-console
    onError: e => console.log('getFlights Error!', e)
  });

  handleApolloError(__filename, error);

  return { getFlights, loading, data, called, error };
};

export type Flight = {
  price: {
    grandTotal: string;
    currency: string;
  };
  itineraries: {
    duration: string;
    segments: {
      departure: {
        iataCode: string;
        at: string;
        terminal: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      number: number;
    }[];
  }[];
};

export type Flights = Flight[];