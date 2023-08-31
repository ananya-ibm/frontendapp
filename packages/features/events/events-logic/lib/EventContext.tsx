/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext, useState } from 'react';
import loadable from '@loadable/component';
import { makeProviderContext } from '@exo/frontend-common-provider';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import {
  EventConfiguration,
  EventContextInterface,
  EventProviderContextProvider,
  EventProviders
} from '@exo/frontend-features-events-types';
import { CustomDomEventContextProvider } from '@exo/frontend-features-events-provider-custom-dom-events';

export const EventContext = makeProviderContext<
  EventProviders,
  EventConfiguration,
  EventContextInterface
>();

export const useEventContext = () => {
  return useContext(EventContext);
};

// @ts-ignore
const preventTreeShaking = (a) => {};

// eslint-disable-next-line react/prop-types
export const EventContextProvider = ({ children, configuration }: Props) => {
  const [EffectiveContextProvider, setEffectiveContextProvider] = useState<
    EventProviderContextProvider | undefined
  >();

  // Attempt to load provider
  if (!EffectiveContextProvider) {
    if (configuration?.featureConfig?.events?.provider === 'console') {
      console.log('Console Events Loaded');
      setEffectiveContextProvider(
        loadable(() => import('@exo/frontend-features-events-provider-console'), {
          resolveComponent: loaded => loaded.ConsoleContextProvider
        })
      );
    } else if (configuration?.featureConfig?.events?.provider === 'mqtt') {
      // TODO: This verification of configuration should move into MQTTContextProvider
      if (
        !configuration?.featureConfig?.events?.mqtt?.broker ||
        !configuration?.featureConfig?.events?.mqtt?.topic
      ) {
        console.warn('Attempting to use MQTT events, but configuration is missing');
      }
      console.log('MQTT Events Loaded');
      setEffectiveContextProvider(
        loadable(() => import('@exo/frontend-features-events-provider-mqtt'), {
          resolveComponent: loaded => loaded.MQTTContextProvider
        })
      );
    } else if (configuration?.featureConfig?.events?.provider === 'custom-dom-events') {
      preventTreeShaking(CustomDomEventContextProvider);
      setEffectiveContextProvider(
        loadable(() => import('@exo/frontend-features-events-provider-custom-dom-events'), {
          resolveComponent: loaded => loaded.CustomDomEventContextProvider
        })
      );
    } else if (configuration?.featureConfig?.events?.provider) {
      console.warn('Unknown event provider');
    }

    if (!EffectiveContextProvider || !configuration)
      return (
        <EventContext.Provider
          value={{ createEvent: () => {}, getEventHistory: () => [], removeEventFromLog: () => {} }}
        >
          {children}
        </EventContext.Provider>
      );
  }

  return (
    <EffectiveContextProvider
      context={EventContext}
      configuration={configuration?.featureConfig?.events!}
    >
      {children}
    </EffectiveContextProvider>
  );
};

type Props = {
  children: any;
  configuration: ApplicationConfig;
};
