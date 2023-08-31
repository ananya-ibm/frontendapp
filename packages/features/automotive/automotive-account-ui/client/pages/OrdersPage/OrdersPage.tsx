/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { OrderHistoryContainer } from '@exo/frontend-features-automotive-account-logic';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import * as S from './OrdersPage.styles';

export const OrdersPage = () => {
  return (
    <Dashboard title="Order history">
      <OrderHistoryContainer
        render={({ orders }) => (
          <S.OrderHistoryPage>
            <h4>My Orders</h4>
            <hr />
            <LayoutSpacing size="sm" />
            {(!orders || orders?.length === 0) && <div>Currently there are no orders found.</div>}
            {orders && orders?.length > 0 && <OrderCard order={orders[0]} />}
          </S.OrderHistoryPage>
        )}
      />
    </Dashboard>
  );
};
