/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { SubscriptionsContainer } from '@exo/frontend-features-automotive-account-logic';
import * as S from './SubscriptionsPage.styles';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Subscriptions } from '../../components/Subscriptions/Subscriptions';

export const SubscriptionsPage = () => {
  return (
    <Dashboard title="Subscriptions">
      <SubscriptionsContainer 
      render={({ subscriptions }) => (
        <S.PurchasedSubscriptionsPage>
          <h4>My Subscriptions</h4>
          <hr/>
          <LayoutSpacing size="sm" />
          {(!subscriptions || subscriptions?.length === 0) && <div>Currently there are no subscriptions found.</div>}
          {(subscriptions && subscriptions?.length > 0) && <Subscriptions cancelled={[]} subscriptions={[]}/>}
        </S.PurchasedSubscriptionsPage>
      )}
      />
    </Dashboard>
  );
};