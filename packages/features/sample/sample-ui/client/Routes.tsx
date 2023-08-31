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
import { TestPage } from './pages/TestPage/TestPage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/sample" missing={PageNotFound}>
      <Route exact path="/sample/testPage" component={TestPage} />
    </AppShellSwitch>
  );
};

export default Routes;
