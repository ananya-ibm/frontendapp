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
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import { Chrome, getChromeConfig } from '@exo/frontend-features-sample-chrome-ui';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import Routes from './Routes';

/* @ts-ignore */
const App = ({ config, children }: Props) => {
  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      <IntlProvider
        translations={[
          { lang: 'en', messages: loadable.lib(() => import('./translations/en')) },
          { lang: 'sv', messages: loadable.lib(() => import('./translations/sv')) }
        ]}
      >
        <ChromeContainer
          config={getChromeConfig(config as ApplicationConfig)}
          render={(args) => <Chrome {...args}>{children ?? <Routes />}</Chrome>}
        />
      </IntlProvider>
    </AppRoot>
  );
};

type Props = {
  config: any;
  children: any;
};

export default App;
