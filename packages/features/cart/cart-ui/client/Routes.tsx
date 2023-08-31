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
import { CartPage } from './pages/CartPage/CartPage';
import { CartConfig } from './cartConfig';
import AccountSelectionPage from './pages/AccountSelectionPage/AccountSelectionPage';

const Routes = ({ config }: { config: CartConfig }) => {
  return (
    <AppShellSwitch prefix="/cart" missing={PageNotFound}>
      <Route path="/cart/cart" render={() => <CartPage config={config} />} />
      <Route path="/cart/account-selection" render={() => <AccountSelectionPage config={config} />} />
    </AppShellSwitch>
  );
};

export default Routes;
