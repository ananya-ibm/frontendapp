/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Route } from 'react-router-dom';
import { ConfiguratorContextProvider } from '@exo/frontend-features-automotive-configurator-logic';
import React from 'react';
import { ApplicationConfig, AppShellSwitch } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import { Configuration } from './containers/Configuration';
import { getFeatureConfig} from './featureConfig';

export const Routes = ( { config } : Props )  => {
  const featureConfig = getFeatureConfig(config);
  return (
    <AppShellSwitch prefix="/automotive" missing={PageNotFound}>
      <Route path="/automotive/:productId/configuration/:configurationId">
        <ConfiguratorContextProvider>
        <Configuration  
           config={featureConfig}
           />
        </ConfiguratorContextProvider>
      </Route>
      <Route path="/automotive/:productId/:skuId/configuration">
        <ConfiguratorContextProvider>
        <Configuration  
           config={featureConfig}
           />
        </ConfiguratorContextProvider>
      </Route>
    </AppShellSwitch>
  );
};

export default Routes;

type Props = {
  config: ApplicationConfig;
};
