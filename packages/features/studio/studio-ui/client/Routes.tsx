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
import { StudioHomepage } from './pages/StudioHomepage/StudioHomepage';
import { EntityPage } from './pages/EntityPage/EnittyPage';
import { EventsPage } from './pages/EventsPage/EventsPage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/studio" missing={PageNotFound}>
      <Route path="/studio/homepage" component={StudioHomepage} />
      <Route path="/studio/data/entities/:entity" render={({ match }) => <EntityPage entity={match.params.entity} />} />
      <Route path="/studio/data" component={StudioHomepage} />
      <Route path="/studio/events" component={EventsPage} />
    </AppShellSwitch>
  );
};

export default Routes;
