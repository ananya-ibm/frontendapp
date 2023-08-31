/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Route } from 'react-router-dom';
import { AppShellSwitch } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';
import FinancePage from './containers/FinancePage';
import FinanceConfiguratorPage from './containers/FinanceConfiguratorPage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/cart" missing={PageNotFound}>
      <Route path="/cart/cart" component={CartPage} />
      <Route path="/cart/checkout" component={CheckoutPage} />
      <Route path="/cart/finance" component={FinancePage} />
      <Route path="/cart/customize" component={FinanceConfiguratorPage} />
    </AppShellSwitch>
  );
};

export default Routes;
