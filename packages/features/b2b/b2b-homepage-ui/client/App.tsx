/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import loadable from '@loadable/component';
import 'cross-fetch/polyfill';
import { IntlProvider } from '@exo/frontend-common-i18n';
import { getChromeConfig } from '@exo/frontend-features-chrome-ui';
import { ApplicationConfig, ExtensionNode } from '@exo/frontend-common-app-shell';
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import Routes from './Routes';

declare global {
  interface EXOFeatureConfig {
    'b2b-homepage'?: {
      advancedSearch: string;
      mainSearchField: string;
      mainSearchFieldDisplay: string;
    };
  }
}

const App = ({ config, children }: Props) => {
  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config)}
        render={(args) => (
          <IntlProvider
            translations={[
              { lang: 'de', messages: loadable.lib(() => import('./translations/de')) },
              { lang: 'en', messages: loadable.lib(() => import('./translations/en')) },
              { lang: 'es', messages: loadable.lib(() => import('./translations/es')) },
              { lang: 'it', messages: loadable.lib(() => import('./translations/it')) },
              { lang: 'hi', messages: loadable.lib(() => import('./translations/hi')) }
            ]}
          >
            <ExtensionNode extensions={config.featureConfig.chrome?.ui} props={args}>
              {children || <Routes />}
            </ExtensionNode>
          </IntlProvider>
        )}
      />
    </AppRoot>
  );
};

type Props = {
  config: ApplicationConfig;
  children: any;
};

export default App;
