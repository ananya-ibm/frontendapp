/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MemoryRouter } from 'react-router';
import { sessionStorage } from '@exo/frontend-common-session-context';
import { AutoMockedProvider } from './AutoMockedProvider';
import merge from './merge';
import { HelmetProvider } from 'react-helmet-async';

// eslint-disable-next-line monorepo-cop/no-relative-import-outside-package 
import b2cNavigationMocks from '../../../features/chrome/chrome-ui/mocks/b2c';
// eslint-disable-next-line monorepo-cop/no-relative-import-outside-package 
import b2cConfig from '../../../apps/commerce/applications';
// eslint-disable-next-line monorepo-cop/no-relative-import-outside-package 
import b2bConfig from '../../../apps/commerce-b2b/applications';
// eslint-disable-next-line monorepo-cop/no-relative-import-outside-package 
import autoConfig from '../../../apps/automotive/applications';

const CONFIG = {
  default: {
    mocks: b2cNavigationMocks,
    config: b2cConfig
  },
  auto: {
    mocks: b2cNavigationMocks,
    config: autoConfig
  },
  b2b: {
    mocks: b2cNavigationMocks,
    config: b2bConfig
  }
};

export const ContainerWrapper = ({
  type,
  app: App,
  mocks,
  config,
  mockState,
  urlPath,
  children
}: Props) => {
  sessionStorage.set({ roles: [] });

  const cfg = CONFIG[type ?? 'default'];

  const c = merge({ ...cfg.config }, config ?? {});

  return (
    <AutoMockedProvider
      mockResolvers={merge(cfg.mocks ?? {}, mocks ?? {})}
      mockState={mockState ?? 'ok'}
    >
      <MemoryRouter initialEntries={urlPath ? [urlPath] : undefined}>
        <HelmetProvider>
          <App config={c}>{children}</App>
        </HelmetProvider>
      </MemoryRouter>
    </AutoMockedProvider>
  );
};

type Props = {
  type?: string;
  app: any;
  children: any;
  mocks?: any;
  config?: any;
  mockState?: 'ok' | 'loading' | 'error';
  urlPath?: string;
};
