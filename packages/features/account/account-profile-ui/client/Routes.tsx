/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { AppShellSwitch, PermittedRoute } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import React from 'react';
import { Route } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { PersonalDetailsPage } from './pages/PersonalDetailsPage/PersonalDetailsPage';
import { MyOrdersPage } from './pages/MyOrdersPage/MyOrdersPage';
import { SecurityPage } from './pages/SecurityPage/SecurityPage';
import { AddressesPage } from './pages/AddressesPage/AddressesPage';
import { PreferencesPage } from './pages/PreferencesPage/PreferencesPage';
import { PaymentPage } from './pages/PaymentPage/PaymentPage';
import { AccountProfileConfig } from './acountProfileConfig';

export const Routes = ({ config }: Props) => (
  <AppShellSwitch prefix="/account-profile" missing={PageNotFound}>
    <PermittedRoute path="/account-profile/profile" component={ProfilePage} perform="profile" />

    <Route path="/account-profile/register" render={() => <RegisterPage config={config} />} />

    <PermittedRoute
      path="/account-profile/details"
      component={PersonalDetailsPage}
      perform="details"
    />

    <PermittedRoute path="/account-profile/orders" component={MyOrdersPage} perform="orders" />

    <PermittedRoute
      path="/account-profile/security"
      render={() => <SecurityPage config={config} />}
      perform="security"
    />

    <PermittedRoute
      path="/account-profile/addresses"
      component={AddressesPage}
      perform="addresses"
    />

    <PermittedRoute
      path="/account-profile/preferences"
      component={PreferencesPage}
      perform="preferences"
    />

    <PermittedRoute path="/account-profile/payment" component={PaymentPage} perform="payment" />
  </AppShellSwitch>
);

type Props = {
  config: AccountProfileConfig;
};
