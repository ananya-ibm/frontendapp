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
import { CostCentersPage } from './pages/CostCentersPage/CostCentersPage';
import { BudgetsPage } from './pages/BudgetsPage/BudgetsPage';
import { OrganizationOverviewPage } from './pages/OrganizationOverviewPage/OrganizationOverviewPage';
import { OrganizationPage } from './pages/OrganizationPage/OrganizationPage';
import { ApprovalDashboardPage } from './pages/ApprovalDashboardPage/ApprovalDashboardPage';
import { OrderPage } from './pages/OrderPage/OrderPage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/my-company" missing={PageNotFound}>
      <Route path="/my-company/my-organization" exact component={OrganizationOverviewPage} />
      <Route
        path="/my-company/organizations/:id"
        exact
        render={({ match }) => <OrganizationPage id={match.params.id} />}
      />
      <PermittedRoute path="/my-company/budgets" component={BudgetsPage} perform="budgets" />
      <PermittedRoute
        path="/my-company/cost-centers"
        component={CostCentersPage}
        perform="cost-centers"
      />
      <PermittedRoute
        path="/my-company/approval"
        component={ApprovalDashboardPage}
        perform="approval-dashboard"
      />
      <PermittedRoute
        path="/my-company/order/:orderId"
        render={({ match }) => <OrderPage id={match.params.orderId} />}
        perform="approval-dashboard"
      />
    </AppShellSwitch>
  );
};

export default Routes;
