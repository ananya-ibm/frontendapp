/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-loop-func */

import { Route } from 'react-router-dom';
import React from 'react';
import { AppShellSwitch } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import { ContentPage } from './containers/ContentPage/ContentPage';
import { ContentPageWithSpots } from './containers/ContentPageWithSpots/ContentPageWithSpots';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/content" missing={PageNotFound}>
      <Route
        path="/content/pages/:id*"
        /* @ts-ignore */
        render={({ match }) => <ContentPage id={match.params.id} />}
      />
      <Route
        path="/content/pagesWithSpots/:id*"
        /* @ts-ignore */
        render={({ match }) => <ContentPageWithSpots id={match.params.id} />}
      />
      <Route
        path="/content/templates/:id*"
        /* @ts-ignore */
        render={({ match }) => <ContentPage id={match.params.id} />}
      />
    </AppShellSwitch>
  );
};

export default Routes;
