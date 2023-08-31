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
import { Redirect, Route } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { VehiclePage } from './pages/VehiclePage/VehiclePage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage';
import { ConfigurationsPage } from './pages/ConfigurationsPage/ConfigurationsPage';
import { MessagesPage } from './pages/MessagesPage/MessagesPage';
import { SubscriptionsPage } from './pages/SubscriptionsPage/SubscriptionsPage';
import { PaymentsPage } from './pages/PaymentsPage/PaymentsPage';
import { LeasePage } from './pages/LeasePage/LeasePage';
import { DocumentsPage } from './pages/DocumentsPage/DocumentsPage';
import { VisitDealerPage } from './pages/VisitDealerPage/VisitDealerPage';

export const Routes = () => {
  return (
    <AppShellSwitch prefix="/account-automotive" missing={PageNotFound}>
      <Redirect from='/account-automotive' exact to='/account-automotive/profile' />
      <Route path="/account-automotive/profile" component={ProfilePage} />
      <Route path="/account-automotive/vehicle" component={VehiclePage} />
      <Route path="/account-automotive/orders" component={OrdersPage} />
      <Route path="/account-automotive/configurations" component={ConfigurationsPage} />
      <Route path="/account-automotive/messages" component={MessagesPage} />
      <Route path="/account-automotive/subscriptions" component={SubscriptionsPage} />
      <Route path="/account-automotive/payments" component={PaymentsPage} />
      <Route path="/account-automotive/lease" component={LeasePage} />
      <Route path="/account-automotive/documents" component={DocumentsPage} />
      <Route path="/account-automotive/visit-dealer" component={VisitDealerPage} />
    </AppShellSwitch>
  );
};
