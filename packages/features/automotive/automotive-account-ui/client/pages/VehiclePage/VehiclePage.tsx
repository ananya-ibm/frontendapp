/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import {
  SubscriptionsContainer,
  VehicleContainer
} from '@exo/frontend-features-automotive-account-logic';
import { OwnerOverview } from '@exo/frontend-components-automotive';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Card, CardSection, CardTitle } from '@exo/frontend-components-base';
import { SubscriptionItem } from '../../components/SubscriptionItem/SubscriptionItem';
import * as S from './VehiclePage.styles';

export const VehiclePage = () => {
  return (
    <Dashboard title="Vehicle Dashboard">
      <VehicleContainer render={({ vehicle }) => <OwnerOverview {...vehicle} />} />
      <LayoutSpacing size="xl" />

      <SubscriptionsContainer
        render={({ subscriptions }) => (
          <Card>
            <CardTitle primaryAction={{ label: 'See more subscriptions', onClick: () => {} }}>
              Your subscriptions
            </CardTitle>
            <CardSection>
              <S.Content>
                {subscriptions.map(item => (
                  <SubscriptionItem
                    key={item.id}
                    item={{
                      title: item.id,
                      subtitle:
                        item.subscribedProducts?.[0]?.product?.price?.list?.value?.toString() ?? ''
                    }}
                  />
                ))}
              </S.Content>
              <LayoutSpacing size="sm" />
            </CardSection>
          </Card>
        )}
      />
    </Dashboard>
  );
};