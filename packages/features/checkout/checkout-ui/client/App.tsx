/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ApplicationConfig, ExtensionNode } from '@exo/frontend-common-app-shell';
import { CheckoutContextProvider } from '@exo/frontend-features-checkout-logic';
import loadable from '@loadable/component';
import { IntlProvider } from '@exo/frontend-common-i18n';
import { getChromeConfig } from '@exo/frontend-features-chrome-ui';
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import 'cross-fetch/polyfill';
import { Routes } from './Routes';
import { getCheckoutConfig } from './checkoutConfig';
import { CheckoutHeader } from './components/CheckoutHeader/CheckoutHeader';

const App = ({ config, children }: { config: ApplicationConfig; children: JSX.Element }) => {
  const AppRoot = config.appWrapper;
  const checkoutConfig = getCheckoutConfig(config);
  return (
    <AppRoot config={config}>
      <CheckoutContextProvider config={{ separateDeliveryScreen: checkoutConfig.feature.separateDeliveryScreen}}>
        <ChromeContainer
          config={getChromeConfig(config as ApplicationConfig)}
          render={(args) => (
            <IntlProvider
              translations={[
                { lang: 'de', messages: loadable.lib(() => import('./translations/de')) },
                { lang: 'sv', messages: loadable.lib(() => import('./translations/sv')) },
                { lang: 'es', messages: loadable.lib(() => import('./translations/es')) },
                { lang: 'it', messages: loadable.lib(() => import('./translations/it')) },
                { lang: 'hi', messages: loadable.lib(() => import('./translations/es')) }
              ]}
            >
              <ExtensionNode extensions={config.featureConfig.chrome?.ui} props={{
                ...args,
                mode: 'checkout',
                renderHeader: () => <CheckoutHeader />
              }}>
                {children ?? <Routes config={checkoutConfig} />}
              </ExtensionNode>
            </IntlProvider>
          )}
        />
      </CheckoutContextProvider>
    </AppRoot>
  );
};

export default App;
