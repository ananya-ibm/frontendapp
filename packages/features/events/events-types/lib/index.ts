/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ProviderContextProvider } from '@exo/frontend-common-provider';

export type EventConfiguration = {
  provider: 'console' | 'mqtt' | 'custom-dom-events';
  mqtt?: {
    broker: string;
    topic: string;
  };
};

export type EventProviders = {
  EventConnector: (props: { children: any }) => React.ReactElement;
};


declare global {
  interface EXOFeatureConfig {
    events?: EventConfiguration;
  }
}


export type EXOEvent = { id: string } & any;

export type EventContextInterface = {
  createEvent: (e: EXOEvent) => void;
  getEventHistory: () => EXOEvent[];
  removeEventFromLog: (id: string) => void;
};

export type EventProviderContextProvider = ProviderContextProvider<
  EventProviders,
  EventConfiguration,
  EventContextInterface
>;
