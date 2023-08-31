/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-console */

import React from 'react';
import { AppShellContextProvider } from '@exo/frontend-common-app-shell';
import { IntlProvider } from '@exo/frontend-common-i18n';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import { NotificationContextProvider } from '@exo/frontend-common-notification';
import { MemoryRouter } from 'react-router';
import { AutoMockedProvider } from './AutoMockedProvider';

export const SmartComponentWrapper = ({ children, mocks, mockState, urlPath, config }: Props) => {
  return (
    <AutoMockedProvider
      mockState={mockState ?? 'ok'}
      mockResolvers={{ Query: { ...mocks?.Query } }}
    >
      <MemoryRouter initialEntries={urlPath ? [urlPath] : undefined}>
        <AppShellContextProvider config={config}>
          <SessionContextProvider>
            <NotificationContextProvider>
              <IntlProvider
                translations={[]}
                onError={err => console.log(err.toString().split('"')[1])}
              >
                {children}
              </IntlProvider>
            </NotificationContextProvider>
          </SessionContextProvider>
        </AppShellContextProvider>
      </MemoryRouter>
    </AutoMockedProvider>
  );
};

type Props = {
  children: any;
  mocks?: any;
  config?: any;
  mockState?: 'ok' | 'loading' | 'error';
  urlPath?: string;
};
