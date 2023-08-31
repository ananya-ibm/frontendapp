/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext, useEffect } from 'react';
import { ApolloError, ApolloProvider, getApolloContext } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';
import { useAppShellContext } from './AppShellContext';
import { useNotificationContext } from '@exo/frontend-common-notification';

export const AppShellApolloProvider = ({ children }) => {
  const { client } = useContext(getApolloContext());
  const config = useAppShellContext();
  const notificationContext = useNotificationContext();

  const handleGQLError = (err: Error) => {
    notificationContext?.notifyUnexpectedError(`GQL Error`, err)
  };

  const handleNetworkError = (err: Error) => {
    notificationContext?.notifyUnexpectedError(`GQL Error`, err);
  };

  useEffect(() => {
    const handleEvent = (event: CustomEvent | Event) => {
      const error: ErrorResponse = (event as CustomEvent).detail;
      if (error.graphQLErrors) {
        if ((event as CustomEvent).detail.graphQLErrors[0].handled) return;
        handleGQLError(new ApolloError(error));
      }
      if (error.networkError) {
        handleNetworkError(new ApolloError(error));
      }
    };
    document.addEventListener('gql-error', handleEvent, false);

    return () => {
      document.removeEventListener('gql-error', handleEvent, false);
    };
  });

  if (client) {
    return <>{children}</>;
  }

  return (
    <ApolloProvider client={config!.client()}>
      {children}
    </ApolloProvider>
  );
};
