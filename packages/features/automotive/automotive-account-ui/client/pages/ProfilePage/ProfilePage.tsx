/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { OrderHistoryContainer } from '@exo/frontend-features-account-profile-logic';
import { Button, Card, CardTitle, CardSection } from '@exo/frontend-components-base';
import { LayoutSpacing, MonetaryAmount } from '@exo/frontend-components-core';
import {
  Configuration,
  DealerContainer,
  getPrice,
  MessagesContainer,
  SavedConfigurationsContainer
} from '@exo/frontend-features-automotive-account-logic';
import { ImageTile } from '@exo/frontend-components-commerce';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { DealerDetails } from '@exo/frontend-components-automotive';
import { Messages } from '../../components/Messages/Messages';
import * as S from './ProfilePage.styles';
import { AccountOverviewConfiguration } from '../../components/AccountOverviewConfiguration/AccountOverviewConfiguration';

const getOrderCards = latestOrders =>
  latestOrders.map(order => (
    <S.Order key={order.id}>
      <S.OrderHeader>
        <div>
          <S.OrderHeaderField>
            Placed at: {new Date(order.placedDate).toDateString()}
          </S.OrderHeaderField>
          <S.OrderHeaderField>Order id: {order.id}</S.OrderHeaderField>
        </div>
        <Button label="Re-Order" />
      </S.OrderHeader>

      <S.OrderInfo>
        <S.OrderInfoField>
          <div>Status: {order.status}</div>
          <LayoutSpacing size="sm" />
          <div>
            Order total:{' '}
            <MonetaryAmount value={order.grandTotal.value} currency={order.grandTotal.currency} />
          </div>
        </S.OrderInfoField>
        <S.Media>
          <ImageTile
            src={getClientImagePath(order?.lineItems[0]?.item?.thumbnail)}
            alt={order?.lineItems[0]?.item?.name}
          />
        </S.Media>
      </S.OrderInfo>
    </S.Order>
  ));

const getConfigurationData = (userConfigurations: Configuration[]) => {
  const mapConfiguration = (lastestConfigurations: Configuration[]) =>
    lastestConfigurations.map(conf => ({
      id: conf.id,
      description: conf.baseProduct?.description || conf.baseProduct?.longDescription,
      productId: conf.baseProduct?.id,
      amount: {
        currency: conf.baseProduct?.price?.list?.currency || 'GBP',
        value: Number(conf?.baseProduct?.price?.list?.value) + getPrice(conf) || '0.00'
      }
    }));

  const lastestConf = Array.from(mapConfiguration(userConfigurations))
    .reverse()
    .slice(0, 3);

  return (
    <Card>
      <CardTitle>Your Car</CardTitle>
      <CardSection>
        <p>Your saved configurations</p>
        <LayoutSpacing size="xs" />

        {lastestConf?.map(conf => (
          <AccountOverviewConfiguration key={conf.id} conf={conf} />
        ))}

        <LayoutSpacing size="xs" />
        <S.LeftButton>
          <LayoutSpacing size="sm" />
          <Button label="Go to My Configurations" />
        </S.LeftButton>
      </CardSection>
    </Card>
  );
};

export const ProfilePage = () => {
  return (
    <Dashboard title="Overview">
      <S.OrderHistoryPage>
        <OrderHistoryContainer
          render={({ orders }) => (
            <>
              {orders.length === 0 && <div>No orders</div>}
              {orders.length > 0 && (
                <>
                  <Card>
                    <CardTitle>Your latest orders</CardTitle>
                    <CardSection>
                      <S.Content>{getOrderCards(orders.slice(0, 3))}</S.Content>
                      <LayoutSpacing size="sm" />
                    </CardSection>
                  </Card>
                  <LayoutSpacing size="sm" />

                  <MessagesContainer render={props => <Messages {...props} />} />
                  <LayoutSpacing size="sm" />

                  <DealerContainer render={props => <DealerDetails {...props} />} />
                </>
              )}
            </>
          )}
        />

        <SavedConfigurationsContainer
          render={({ configurations }) => (
            <>
              <LayoutSpacing size="sm" />
              {getConfigurationData(configurations)}
            </>
          )}
        />
      </S.OrderHistoryPage>
    </Dashboard>
  );
};
