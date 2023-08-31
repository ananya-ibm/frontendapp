/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { ManageOrdersContainer } from '@exo/frontend-features-marketplace-logic';
import { Orders } from '../../components/Orders/Orders';

export const OrdersPage = () => {
  return (
    <Dashboard title="My orders">
      <ManageOrdersContainer
        render={({ getOrder, orders }) => <Orders getOrder={getOrder} orders={orders} />}
      />
    </Dashboard>
  );
};
