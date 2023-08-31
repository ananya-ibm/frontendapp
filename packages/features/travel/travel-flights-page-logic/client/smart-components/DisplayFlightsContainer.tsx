/* eslint-disable react/jsx-one-expression-per-line */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { renderDefaultError, RenderError, RenderLoading } from '@exo/frontend-common-utils';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { FlightSearchQuery } from '../hooks/useFlightSearch';

export const DisplayFlightsContainer = ({
  render,
  renderLoading,
  renderError = renderDefaultError
}: Props) => {
  const session = useSessionContext();

  const { loading, data, error } = useQuery(FlightSearchQuery, {
    variables: session.flightInfo,
    // eslint-disable-next-line no-console
    onError: e => console.log('getFlights Error!', e)
  });

  if (loading)
    return renderLoading({
      flightType: session.flightInfo?.returnDate ? '2-way' : '1-way',
      flightInfo: session.flightInfo
    });
  if (error) return renderError(error);

  return render({ flights: data.flightSearch, flightInfo: session.flightInfo });
};

type Props = {
  render: (args: DisplayFlightsContainerRenderProps) => JSX.Element;
  renderLoading: RenderLoadingArgs;
  renderError?: RenderError;
};

export type DisplayFlightsContainerRenderProps = {
  flights: any[];
  flightInfo?: FlightInfo;
};

export type DisplayFlightsContainerRenderLoadingProps = {
  flightType: '1-way' | '2-way';
  flightInfo?: FlightInfo;
};

export type RenderLoadingArgs =
  | RenderLoading
  | ((args: DisplayFlightsContainerRenderLoadingProps) => JSX.Element);

export type FlightInfo = {
  originLocationCode: string;
  originLocationCity: string;
  originLocationCountry: string;
  originAirportName: string;
  destinationLocationCode: string;
  destinationLocationCity: string;
  destinationLocationCountry: string;
  destinationAirportName: string;
  departureDate: string | null;
  returnDate?: string | null;
  passengerCount: number;
  travelClass: string[];
  travelClassesString: string;
  directFlightOnly?: boolean;
};