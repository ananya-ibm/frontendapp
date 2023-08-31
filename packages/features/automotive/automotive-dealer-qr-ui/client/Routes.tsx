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
import { QRScannerPage } from './pages/QRScannerPage/QRScannerPage';


const Routes = () => {
  return (
    <AppShellSwitch prefix="/qrscanner" missing={PageNotFound}>
      <Route exact path="/qrscanner/qrscanner" component={QRScannerPage} />
    </AppShellSwitch>
  );
};

export default Routes;
