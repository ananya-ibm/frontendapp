/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { ManageProductsContainer } from '@exo/frontend-features-marketplace-logic';
import { useHistory } from 'react-router-dom';
import { useNotificationContext } from '@exo/frontend-common-notification';
import { Products } from '../../components/Products/Products';

export const ProductsPage = () => {
  const { createNotification } = useNotificationContext()!;
  const history = useHistory();
  return (
    <Dashboard title="Products">
      <ManageProductsContainer
        render={args => (
          <Products
            onCreate={async (v: any) => {
              await args.onCreate!(v);

              createNotification({
                kind: 'success',
                title: 'Your product details have updated'
              });

              history.push('/account-stores/overview');
            }}
          />
        )}
      />
    </Dashboard>
  );
};
