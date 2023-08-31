/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import App from '../../App';
import { CartPage } from './CartPage';
import b2cCartMocks from '../../../mocks/b2c-cart';

export default {
  title: 'Features/Cart/Pages/CartPage',
  component: CartPage,
  decorators: [
    (Story: any) => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

type Props = React.ComponentProps<typeof CartPage>;

export const Default = (args: Props) => (
  <ContainerWrapper app={App} mocks={b2cCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [], cartId: '1' }}>
      <CartPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {
  config: {
    feature: {
      zipIn: 'none'
    }
  }
} as Props;

// ---------------------------------------------------------------------

export const Loading = (args: Props) => (
  <ContainerWrapper app={App} mocks={b2cCartMocks.cart()} mockState="loading">
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CartPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Loading.args = { ...Default.args } as Props;

// ---------------------------------------------------------------------

export const Error = (args: Props) => (
  <ContainerWrapper app={App} mocks={b2cCartMocks.cart()} mockState="error">
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CartPage {...args} />
    </SessionContextProvider>
  </ContainerWrapper>
);
Error.args = { ...Default.args } as Props;
