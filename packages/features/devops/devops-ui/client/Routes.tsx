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
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { SystemsPage } from './pages/SystemsPage/SystemsPage';
import { SystemPage } from './pages/SystemPage/SystemPage';
import { SchemasPage } from './pages/SchemasPage/SchemasPage';
import { SchemaPage } from './pages/SchemaPage/SchemaPage';
import { TemplatePage } from './pages/TemplatePage/TemplatePage';
import { TemplatesPage } from './pages/TemplatesPage/TemplatesPage';
import { DeploymentCreateInputPage } from './pages/DeploymentCreateInputPage/DeploymentCreateInputPage';
import { DeploymentsPage } from './pages/DeploymentsPage/DeploymentsPage';
import { DeploymentPage } from './pages/DeploymentPage/DeploymentPage';
import { StorybookPage } from './pages/StorybookPage/StorybookPage';
import { DocumentationPage } from './pages/DocumentationPage/DocumentationPage';

const Routes = () => {
  return (
    <AppShellSwitch prefix="/devops" missing={PageNotFound}>
      <Route path='/devops/reference-architecture' render={() => <SystemsPage />} />
      <Route path='/devops/systems/:param' render={({ match }) => <SystemPage id={match.params.param} />} />
      <Route path='/devops/apis' render={() => <SchemasPage />} />
      <Route path='/devops/api/:param' render={({ match }) => <SchemaPage id={"@exo/" + match.params.param} />} />
      <Route path='/devops/catalog/:param' render={({ match }) => <TemplatePage id={match.params.param} />} />
      <Route path='/devops/catalog' render={() => <TemplatesPage />} />
      <Route path='/devops/DeploymentCreateInputPage' render={() => <DeploymentCreateInputPage />} />
      <Route path='/devops/deployments' render={() => <DeploymentsPage />} />
      <Route path='/devops/DeploymentPage/:param' render={({ match }) => <DeploymentPage id={match.params.param} />} />
      <Route path="/devops/dashboard" component={DashboardPage} />
      <Route path="/devops/storybook" component={StorybookPage} />
      <Route path="/devops/docs" component={DocumentationPage} />
    </AppShellSwitch>
  );
};

export default Routes;
