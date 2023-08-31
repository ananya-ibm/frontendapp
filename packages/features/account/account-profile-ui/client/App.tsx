/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import 'cross-fetch/polyfill';
import { getChromeConfig } from '@exo/frontend-features-chrome-ui';
import loadable from '@loadable/component';
import { IntlProvider } from '@exo/frontend-common-i18n';
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import { ApplicationConfig, ExtensionNode } from '@exo/frontend-common-app-shell';
import { Routes } from './Routes';
import { getAccountProfileConfig } from './acountProfileConfig';

const App = ({ config, children }: Props) => {
  const AppRoot = config.appWrapper;
  const accountProfileConfig = getAccountProfileConfig(config);
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config as ApplicationConfig)}
        render={(args) => (
          <IntlProvider
            translations={[
              { lang: 'de', messages: loadable.lib(() => import('./translations/de')) },
              { lang: 'fr', messages: loadable.lib(() => import('./translations/fr')) },
              { lang: 'es', messages: loadable.lib(() => import('./translations/es')) },
              { lang: 'it', messages: loadable.lib(() => import('./translations/it')) },
              { lang: 'hi', messages: loadable.lib(() => import('./translations/hi')) },
              { lang: 'sv', messages: loadable.lib(() => import('./translations/sv')) }
            ]}
          >
            <ExtensionNode extensions={config.featureConfig.chrome?.ui} props={args}>
              {children ?? <Routes config={accountProfileConfig} />}
            </ExtensionNode>
          </IntlProvider>
        )}
      />
    </AppRoot>
  );
};

type Props = {
  config: ApplicationConfig;
  children: JSX.Element;
};

export default App;
