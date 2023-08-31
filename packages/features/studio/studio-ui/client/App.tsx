/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useCallback, useState } from 'react';
import 'cross-fetch/polyfill';
import { AppChrome, getChromeConfig } from '@exo/frontend-features-chrome-ui';
import Routes from './Routes';
import { ChromeContainer } from '@exo/frontend-features-chrome-logic';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { Route, Switch } from 'react-router-dom';
import { DataNavigation } from './navigation-panels/DataNavigation';
import { EventNavigation } from './navigation-panels/EntityNavigation';

const App = ({ config, children }: Props) => {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);

  const onClickSideNavExpand = useCallback(() => {
    setIsSideNavExpanded((prevIsSideNavExpanded) => !prevIsSideNavExpanded);
  }, [setIsSideNavExpanded]);

  const AppRoot = config.appWrapper;
  return (
    <AppRoot config={config}>
      <ChromeContainer
        config={getChromeConfig(config as ApplicationConfig)}
        render={(args) => (
          <Switch>
            <Route
              path="/studio/data"
              render={() => (
                <AppChrome
                  {...args}
                  isSideNavExpanded={isSideNavExpanded}
                  onClickSideNavExpand={onClickSideNavExpand}
                  renderSideNav={() => <DataNavigation />}
                >
                  {children ?? <Routes />}
                </AppChrome>
              )}
            />

            <Route
              path="/studio/events"
              render={() => (
                <AppChrome
                  {...args}
                  isSideNavExpanded={isSideNavExpanded}
                  onClickSideNavExpand={onClickSideNavExpand}
                  renderSideNav={() => <EventNavigation />}
                >
                  {children ?? <Routes />}
                </AppChrome>
              )}
            />

            <Route
              render={() => (
                <AppChrome
                  {...args}
                  isSideNavExpanded={isSideNavExpanded}
                  onClickSideNavExpand={onClickSideNavExpand}
                >
                  {children ?? <Routes />}
                </AppChrome>
              )}
            />
          </Switch>
        )}
      />
    </AppRoot>
  );
};

type Props = {
  config: any;
  children: any;
};

export default App;
