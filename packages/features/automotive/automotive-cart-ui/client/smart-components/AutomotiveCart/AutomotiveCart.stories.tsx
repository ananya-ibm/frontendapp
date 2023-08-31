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
import AutomotiveCart from './AutomotiveCart';
import autoCartMocks from '../../../mocks/auto-cart';

export default {
  title: 'Features/Automotive/Cart/Smart Components/AutomotiveCart',
  component: AutomotiveCart
};

export const Default = args => (
  <SmartComponentWrapper mocks={autoCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <AutomotiveCart {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Default.args = {};

// -------------------------------------------------------------------------------

export const Empty = args => (
  <SmartComponentWrapper mocks={{}}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', cartId: '-1', roles: [] }}>
      <AutomotiveCart {...args} />
    </SessionContextProvider>
  </SmartComponentWrapper>
);
Empty.args = {};

// -------------------------------------------------------------------------------
