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
import { LoggingActivityPage } from './pages/LoggingActivityPage/LoggingActivityPage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/stats" missing={PageNotFound}>
       <Route exact path="/stats/user-logins" component={LoggingActivityPage} />
    </AppShellSwitch>
  );
};

export default Routes;
