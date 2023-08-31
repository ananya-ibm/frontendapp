/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  ApplicationConfig,
  AppShellApolloProvider,
  AppShellContextProvider
} from '@exo/frontend-common-app-shell';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import { ThemeProvider } from '@exo/frontend-common-theme-proxy';
import { CmsContextProvider } from '@exo/frontend-content-api';
import { NotificationContextProvider } from '@exo/frontend-common-notification';
import { EventContextProvider } from '@exo/frontend-features-events-logic';
import React from 'react';
import { DevContextProvider } from '@exo/frontend-features-dev-toolbar-logic';

export const AppWrapper = ({ config, children }) => {
  return (
    <AppShellContextProvider config={config}>
      <NotificationContextProvider>
        <AppShellApolloProvider>
          <DevContextProvider config={config as ApplicationConfig}>
            <SessionContextProvider isGuest>
              <EventContextProvider configuration={config}>
                <ThemeProvider>
                  <CmsContextProvider configuration={config}>{children}</CmsContextProvider>
                </ThemeProvider>
              </EventContextProvider>
            </SessionContextProvider>
          </DevContextProvider>
        </AppShellApolloProvider>
      </NotificationContextProvider>
    </AppShellContextProvider>
  );
};
