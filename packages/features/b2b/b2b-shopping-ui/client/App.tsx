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
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { Chrome } from '@exo/frontend-features-b2b-chrome-ui';
import Routes from './Routes';

const App = ({ config, children }) => {
  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config as ApplicationConfig)}
        render={(args) => <Chrome {...args}>{children ?? <Routes />}</Chrome>}
      />
    </AppRoot>
  );
};

export default App;
