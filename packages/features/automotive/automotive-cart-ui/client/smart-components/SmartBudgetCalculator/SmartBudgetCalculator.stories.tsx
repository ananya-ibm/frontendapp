/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import { SmartBudgetCalculator } from './SmartBudgetCalculator';
import autoCartMocks from '../../../mocks/auto-cart';

export default {
  title: 'Features/Automotive/Cart/Smart Components/SmartBudgetCalculator',
  component: SmartBudgetCalculator
};

export const Default = () => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <SmartBudgetCalculator />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
