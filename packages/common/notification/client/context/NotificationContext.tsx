/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApolloError } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type NotificationContextType = {
  getNotifications: () => NotificationType[];
  createNotification: (n: Omit<NotificationType, 'id'> & { id?: string }) => void;
  notifyUnexpectedError: (title: string, error: Error, subtitle?: string) => void;
  removeNotification: (id: string) => void;
  clearErrors: () => void;
}

export const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }) => {
  const [context, setContext] = useState<NotificationType[]>([]);
  const value = {
    getNotifications: () => context,

    createNotification: (n: Omit<NotificationType, 'id'> & { id?: string }) => {
      const newNotice = {
        id: uuidv4(),
        ...n
      };
      setContext([...context.filter(e => e.id !== n.id), newNotice]);
    },

    notifyUnexpectedError: (title, err: Error, subtitle?: string) => {
      if ((err as any).graphQLErrors) {
        ((err as ApolloError).graphQLErrors[0] as any).handled = true;
      }

      const id = title;
      const newNotice: NotificationType = {
        id: title,
        title,
        subtitle: subtitle ?? err.message,
        action: 'Details',
        kind: 'error',
        exception: err,
        close: 'manual'
      };
      setContext([...context.filter(e => e.id !== id), newNotice]);
    },

    removeNotification: (id: string) => {
      const newNotifications = context.filter(n => n.id !== id && n);
      if (newNotifications.length !== context.length) {
        setContext(newNotifications);
      }
    },

    clearErrors: () => {
      if (context.length > 0) setContext([...context.filter(e => e.kind !== 'error')]);
    }
  };
  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export type NotificationType = {
  close?: string;
  id: string;
  kind?: 'error' | 'info' | 'success' | 'warning';
  title: string;
  subtitle?: string;
  action?: string;
  onActionButtonClick?: () => void;
  exception?: Error;
  description?: string;
};
