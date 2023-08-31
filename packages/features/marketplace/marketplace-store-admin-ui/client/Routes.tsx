/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { AppShellSwitch } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import React from 'react';
import { Route } from 'react-router-dom';
import { OverviewPage } from './pages/OverviewPage/OverviewPage';
import { CreateStorePage } from './pages/CreateStorePage/CreateStorePage';
import { StoreInfoPage } from './pages/StoreInfoPage/StoreInfoPage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { ShippingPage } from './pages/ShippingPage/ShippingPage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/account-stores" missing={PageNotFound}>
      <Route path="/account-stores/overview" component={OverviewPage} />
      <Route path="/account-stores/create" component={CreateStorePage} />
      <Route path="/account-stores/store-info" component={StoreInfoPage} />
      <Route path="/account-stores/shipping" component={ShippingPage} />
      <Route path="/account-stores/products" component={ProductsPage} />
      <Route path="/account-stores/orders" component={OrdersPage} />
    </AppShellSwitch>
  );
};

export default Routes;
