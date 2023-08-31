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
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import { ApplicationConfig, ExtensionNode } from '@exo/frontend-common-app-shell';
import Routes from './Routes';

const App = ({ config, children }: Props) => {
  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config as ApplicationConfig)}
        render={(args) => (
          <ExtensionNode extensions={config.featureConfig.chrome?.ui} props={args}>
            {children ?? <Routes />}
          </ExtensionNode>
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
