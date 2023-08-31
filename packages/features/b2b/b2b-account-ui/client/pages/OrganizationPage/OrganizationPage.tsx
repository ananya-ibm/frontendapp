/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { OrganizationContainer } from '@exo/frontend-features-b2b-account-logic';
import { OrganizationHeader } from '../../components/OrganizationHeader/OrganizationHeader';
import { UsersGrid } from '../../components/UsersGrid/UsersGrid';

export const OrganizationPage = ({ id }: Props) => {
  return (
    <Dashboard title={`Organization: ${id}`}>
      <OrganizationContainer
        id={id}
        render={args => (
          <>
            <OrganizationHeader {...args} />
            <LayoutSpacing size="sm" />
            <UsersGrid {...args} />
          </>
        )}
      />
    </Dashboard>
  );
};

type Props = {
  id: string;
};
