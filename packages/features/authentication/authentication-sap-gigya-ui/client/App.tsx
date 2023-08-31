/*
 Licensed Materials - Property of IBM
 694906H
 (c) Copyright IBM Corp.  2020 All Rights Reserved

 US Government Users Restricted Rights - Use, duplication or disclosure restricted
 by GSA ADP Schedule Contract with IBM Corp.
 */

import React from 'react';
import 'cross-fetch/polyfill';
import { ApplicationConfig, ExtensionNode } from '@exo/frontend-common-app-shell';
import { getChromeConfig } from '@exo/frontend-features-chrome-ui';
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import { getAuthenticationConfig } from './authenticationConfig';
import { SAPGigyaLoginPage } from './pages/SAPGigyaLoginPage/SAPGigyaLoginPage';

const App = ({ config }: Props) => {
  const AppRoot = config.appWrapper;
  const authConfig = getAuthenticationConfig(config);
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config as ApplicationConfig)}
        render={(args) => (
          <>
            <ExtensionNode extensions={config.featureConfig.chrome?.ui} props={args}>
              <SAPGigyaLoginPage config={authConfig} />
            </ExtensionNode>
          </>
        )}
      />
    </AppRoot>
  );
};

type Props = {
  config: ApplicationConfig;
};

export default App;
