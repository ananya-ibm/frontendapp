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
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import { StoresPage } from './pages/StoresPage/StoresPage';
import { StorePage } from './pages/StorePage/StorePage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/marketplace" missing={PageNotFound}>
      <Route path="/marketplace/stores">
        <StoresPage />
      </Route>
      <Route
        path="/marketplace/store/:storePath/:id"
        render={({ match }) => <StorePage id={match.params.id} />}
      />
    </AppShellSwitch>
  );
};

export default Routes;
