/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ApplicationConfig, ExtensionNode } from '@exo/frontend-common-app-shell';
import { IntlProvider } from '@exo/frontend-common-i18n';
import { getChromeConfig } from '@exo/frontend-features-chrome-ui';
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import 'cross-fetch/polyfill';
import Routes from './Routes';

const App = ({ config, children }: { config: ApplicationConfig; children: JSX.Element }) => {
  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config as ApplicationConfig)}
        render={(args) => (
          <IntlProvider translations={[]}>
            <ExtensionNode extensions={config.featureConfig.chrome?.ui} props={args}>
              {children ?? <Routes />}
            </ExtensionNode>
          </IntlProvider>
        )}
      />
    </AppRoot>
  );
};
export default App;
