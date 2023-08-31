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
import { useHistory } from 'react-router-dom';
import { useNotificationContext } from '@exo/frontend-common-notification';
import { CreateStore } from '../../components/CreateStore/CreateStore';

export const CreateStorePage = () => {
  const { createNotification } = useNotificationContext()!;
  const history = useHistory();
  return (
    <Dashboard title="Create store">
      <ManageStoreContainer
        render={({ onCreate }) => (
          <CreateStore
            onCreate={async (v: any) => {
              await onCreate(v);
              createNotification({
                kind: 'success',
                title: 'Thanks for updating your store details'
              });
              history.push('/account-stores/overview');
            }}
          />
        )}
      />
    </Dashboard>
  );
};
