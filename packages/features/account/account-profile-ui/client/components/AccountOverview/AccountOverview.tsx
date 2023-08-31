/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { useIntl } from '@exo/frontend-common-i18n';
import { OrderHistoryContainerRenderProps } from '@exo/frontend-features-account-profile-logic';
import * as S from './AccountOverview.styles';
import OrderCard from '../OrderHistory/OrderCard';

export const AccountOverview = ({ orders }: OrderHistoryContainerRenderProps) => {
  const intl = useIntl('features.account.account-profile-ui.components');

  return (
    <S.OrderHistory>
      {orders?.length === 0 && <div>No orders</div>}
      {orders?.length > 0 && (
        <>
          <h2>{intl.msg('AccountOverview.SubTitle', 'Your latest orders')}</h2>
          <S.Content>
            {orders.slice(0, 3)?.map(order => (
              <div key={order.id}>
                <OrderCard order={order} />
                <LayoutSpacing size="sm" />
              </div>
            ))}
          </S.Content>
        </>
      )}
    </S.OrderHistory>
  );
};

AccountOverview.Skeleton = () => <div>Loading...</div>;
