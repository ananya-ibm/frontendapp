/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
// import loadable from '@loadable/component';
import 'cross-fetch/polyfill';
// import { IntlProvider } from '@exo/frontend-common-i18n';
import { ChromeCSS } from '@exo/frontend-features-chrome-ui';
// import { Chrome, getChromeConfig } from '@exo/frontend-features-chrome-ui';
// import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import Routes from './Routes';

/* @ts-ignore */

const App = ({ config, children }: Props) => {
  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      {/* temporarily add ChromeSS to make carbon work */}
      <ChromeCSS />
      {/* <ChromeContainer
        config={getChromeConfig(config)}
        render={(args) => <Chrome {...args}>{children ?? <Routes />}</Chrome>}
      /> */}
      {children ?? <Routes />}
    </AppRoot>
  );
};

type Props = {
  config: any;
  children: any;
};

export default App;
