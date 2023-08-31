/*
 Licensed Materials - Property of IBM
 694906H
 (c) Copyright IBM Corp.  2020 All Rights Reserved

 US Government Users Restricted Rights - Use, duplication or disclosure restricted
 by GSA ADP Schedule Contract with IBM Corp.
 */

import { Route } from 'react-router-dom';
import React from 'react';
import { AppShellSwitch } from '@exo/frontend-common-app-shell';
import { OIDCLoginPage } from './pages/OIDCLoginPage/OIDCLoginPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { OIDCFrontChannelCallbackHandler } from './pages/OIDCFrontChannelCallbackHandler/OIDCFrontChannelCallbackHandler';
import { OIDCBackChannelCallbackHandler } from './pages/OIDCBackChannelCallbackHandler/OIDCBackChannelCallbackHandler';
import { AuthenticationConfig } from './authenticationConfig';

export const Routes = ({ config }: Props) => {
  return (
    <AppShellSwitch prefix="/auth" missing={() => <div>Page not found</div>}>
      {config.feature.authenticationMode === 'simple' && (
        <Route path="/auth/login">
          <LoginPage config={config} />
        </Route>
      )}

      {config.feature.authenticationMode === 'oidc' && (
        <>
          <Route path="/auth/login">
            <OIDCLoginPage config={config} />
          </Route>
          <Route path="/auth/callback/code" exact>
            <OIDCFrontChannelCallbackHandler
              cancelUrl="/"
              targetUrl="/account-profile/profile"
            />
          </Route>
          <Route path="/auth/callback" exact>
            <OIDCBackChannelCallbackHandler
              cancelUrl="/"
              errorUrl="/"
              targetUrl="/"
            />
          </Route>
        </>
      )}
    </AppShellSwitch>
  );
};

type Props = {
  config: AuthenticationConfig;
};
