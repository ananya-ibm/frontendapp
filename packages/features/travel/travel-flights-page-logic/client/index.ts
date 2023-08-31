/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export * from './hooks/useFlightSearch';
export * from './hooks/useFlightFromCT';
export * from './smart-components/DisplayFlightsContainer';
import { FlightInfo } from './smart-components/DisplayFlightsContainer';

declare global {
  interface EXOSession {
    flightInfo?: FlightInfo;
  }
}