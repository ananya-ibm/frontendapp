/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export * from './hooks/useAncillary';
import { Flight } from '@exo/frontend-features-travel-ancillary-page-ui';

declare global {
  interface EXOSession {
    selectedFlight?: {
      leavingFlight: Flight;
      returningFlight: Flight | null;
      price: string;
    };
    selectedAncillaries?: {
      name: string;
      ID: string;
      priceValue: number;
      priceCurrency: string;
    }[] | null;
    selectedTravelPackage?: {
      name: string;
      ID: string;
      priceValue: number;
      priceCurrency: string;
      options?: {
        ID: string;
        name?: string;
      }[];
    } | null;
  }
}