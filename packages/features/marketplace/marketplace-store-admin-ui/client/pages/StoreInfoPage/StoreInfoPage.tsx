/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { ManageStoreContainer } from '@exo/frontend-features-marketplace-logic';
import { useNotificationContext } from '@exo/frontend-common-notification';
import { StoreInfo } from '../../components/StoreInfo/StoreInfo';

export const StoreInfoPage = () => {
  const { createNotification } = useNotificationContext()!;
  const pageTitle = 'Store info';
  return (
    <Dashboard title={pageTitle}>
      <ManageStoreContainer
        render={({ store, onUpdate }) => (
          <StoreInfo
            onUpdate={async (id, v) => {
              await onUpdate(id, v);
              createNotification({
                kind: 'success',
                title: 'Thanks for updating your store details'
              });
            }}
            store={store}
          />
        )}
      />
    </Dashboard>
  );
};
