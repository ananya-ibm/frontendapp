/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/accessible-emoji */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import {
  EventContextInterface,
  EventProviderContextProvider,
  EXOEvent
} from '@exo/frontend-features-events-types';
import { BaseProviderContextProvider } from '@exo/frontend-common-provider';

export const ConsoleContextProvider: EventProviderContextProvider = ({
  context,
  configuration,
  children
}) => {
  const [events, setEvents] = useState<EXOEvent[]>([]);

  const value: EventContextInterface = {
    getEventHistory: () => events,

    createEvent: nE => {
      console.log('event created: ', nE);
    },

    removeEventFromLog: id => {
      const newEvents = events.filter(n => n.id !== id && n);
      setEvents(newEvents);
    }
  };

  return (
    <BaseProviderContextProvider value={value} context={context} configuration={configuration}>
      {children}
    </BaseProviderContextProvider>
  );
};
