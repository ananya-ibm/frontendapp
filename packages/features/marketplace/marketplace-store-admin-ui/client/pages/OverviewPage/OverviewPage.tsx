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
import { Button } from '@exo/frontend-components-base';
import { ManageStoreContainer } from '@exo/frontend-features-marketplace-logic';
import { useHistory } from 'react-router-dom';
import { SellerDashboard } from '../../components/SellerDashboard/SellerDashboard';

export const OverviewPage = () => {
  const history = useHistory();
  return (
    <Dashboard title="Overview">
      <ManageStoreContainer
        render={({ store, onDelete }) => {
          const hasStore = store?.id;
          return (
            <>
              {hasStore ? (
                <SellerDashboard store={store} onDelete={onDelete} />
              ) : (
                <div>
                  <p>You don&rsquo;t have any stores.</p>
                  <LayoutSpacing size="sm" />

                  <Button
                    onClick={() => history.push('/account-stores/create')}
                    label="Create a new store"
                  />
                </div>
              )}
            </>
          );
        }}
      />
    </Dashboard>
  );
};
