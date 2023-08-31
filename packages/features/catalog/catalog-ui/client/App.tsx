/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import loadable from '@loadable/component';
import React from 'react';
import { IntlProvider } from '@exo/frontend-common-i18n';
import { Chrome, getChromeConfig } from '@exo/frontend-features-chrome-ui';
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';

import { Routes } from './Routes';

const App = ({ config, children }: Props) => {
  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config as ApplicationConfig)}
        render={(args) => (
          /* TODO: This is just to be able to test formatting of numbers */
          <IntlProvider
            translations={[
              { lang: 'de', messages: loadable.lib(() => import('./translations/de')) },
              { lang: 'es', messages: loadable.lib(() => import('./translations/es')) },
              { lang: 'it', messages: loadable.lib(() => import('./translations/it')) },
              { lang: 'hi', messages: loadable.lib(() => import('./translations/hi')) },
              { lang: 'sv', messages: loadable.lib(() => import('./translations/sv')) }
            ]}
          >
            <Chrome {...args}>{children ?? <Routes config={config} />}</Chrome>
          </IntlProvider>
        )}
      />
    </AppRoot>
  );
};

type Props = {
  config: any;
  children: JSX.Element;
};

export default App;
