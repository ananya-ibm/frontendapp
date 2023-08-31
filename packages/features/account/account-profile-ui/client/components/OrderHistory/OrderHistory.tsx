/* eslint-disable react/jsx-one-expression-per-line */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { OrderHistoryContainerRenderProps } from '@exo/frontend-features-account-profile-logic';
import * as S from './OrderHistory.styles';
import OrderCard from './OrderCard';

export const OrderHistory = ({ orders }: OrderHistoryContainerRenderProps) => {
  return (
    <S.OrderHistoryPage>
      {orders?.length === 0 && <div>No orders</div>}
      {orders?.length > 0 && (
        <S.Content>
          {orders?.map(order => (
            <div key={order.id}>
              <OrderCard order={order} />
              <LayoutSpacing size="sm" />
            </div>
          ))}
        </S.Content>
      )}
    </S.OrderHistoryPage>
  );
};

OrderHistory.Skeleton = () => <div>Loading...</div>;
