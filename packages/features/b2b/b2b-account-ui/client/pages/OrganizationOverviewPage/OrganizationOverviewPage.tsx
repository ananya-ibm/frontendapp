/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { UserOrganizationContainer } from '@exo/frontend-features-b2b-account-logic';
import { useHistory } from 'react-router-dom';
import { OrganizationOverviewTable } from '../../components/OrganizationOverviewTable/OrganizationOverviewTable';

export const OrganizationOverviewPage = () => {
  const history = useHistory();

  const handleEdit = (id: string) => {
    history.push(`/my-company/organizations/${id}`);
  };

  return (
    <Dashboard title="My Organization">
      <UserOrganizationContainer
        render={args => <OrganizationOverviewTable {...args} onViewOrganization={handleEdit} />}
      />
    </Dashboard>
  );
};
