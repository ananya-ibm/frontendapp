/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/accessible-emoji */

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Connector, useMqttState, useSubscription } from 'mqtt-react-hooks';
import { useSessionContext } from '@exo/frontend-common-session-context';
import {
  EventContextInterface,
  EventProviderContextProvider,
  EXOEvent
} from '@exo/frontend-features-events-types';
import { BaseProviderContextProvider } from '@exo/frontend-common-provider';

const MQTTContextProviderInner: EventProviderContextProvider = ({
  context,
  children,
  configuration
}) => {
  const [events, setEvents] = useState<EXOEvent[]>([]);
  const [unsentEvents, setUnsentEvents] = useState<EXOEvent[]>([]);

  const { client, connectionStatus } = useMqttState();

  const { type, configurationId, customerConfigurationId } = useSessionContext();
  const generateTopic = (topicType, direction) => {
    const idToUse = topicType === 'DEALER' ? customerConfigurationId : configurationId;

    const directionToUse =
      // eslint-disable-next-line no-nested-ternary
      topicType === 'DEALER'
        ? direction === 'subscription'
          ? 'DEALER'
          : 'CUSTOMER'
        : direction === 'subscription'
        ? 'CUSTOMER'
        : 'DEALER';

    return configurationId
      ? `${configuration.mqtt!.topic}/${idToUse}/${directionToUse}`
      : configuration.mqtt!.topic;
  };

  const { message: received, connectionStatus: subConnectionStatus } = useSubscription(
    generateTopic(type, 'subscription')
  );

  useEffect(() => {
    console.log('MQTT Broker connection status: ', connectionStatus);
    console.log('MQTT Client Subscription Status: ', subConnectionStatus);
  });

  useEffect(() => {
    if (received && received?.message) {
      console.log('received: ', JSON.parse(received.message.toString()));
      setEvents([JSON.parse(received.message.toString()), ...events]);
    }
  }, [received]);

  const value: EventContextInterface = {
    getEventHistory: () => events,

    createEvent: nE => {
      if (client) {
        console.log('sent: ', nE, '  to  ', generateTopic(type, 'publish'));
        const newEvent = {
          ...nE,
          id: uuidv4(),
          event_initiator: 'USER'
        };
        client.publish(generateTopic(type, 'publish'), JSON.stringify(nE));
        setEvents([newEvent, ...events]);
      } else {
        console.warn('No client avaliable to publish: ', nE);
        setUnsentEvents([...unsentEvents, nE]);
      }
    },

    removeEventFromLog: id => {
      const newNotifications = events.filter(n => n.id !== id && n);
      setEvents(newNotifications);
    }
  };

  // Events might be generated before the client is initialized
  // ... this ensures any such events are sent as soon as the client is initialized
  useEffect(() => {
    if (client) {
      unsentEvents.forEach(e => {
        value.createEvent(e);
      });
      setUnsentEvents([]);
    }
  }, [client]);

  return (
    <BaseProviderContextProvider value={value} context={context} configuration={configuration}>
      {children}
    </BaseProviderContextProvider>
  );
};

export const MQTTContextProvider: EventProviderContextProvider = ({
  context,
  children,
  configuration
}) => {
  return (
    <Connector brokerUrl={configuration.mqtt!.broker} options={{ keepalive: 0 }}>
      <MQTTContextProviderInner context={context} configuration={configuration}>
        {children}
      </MQTTContextProviderInner>
    </Connector>
  );
};
