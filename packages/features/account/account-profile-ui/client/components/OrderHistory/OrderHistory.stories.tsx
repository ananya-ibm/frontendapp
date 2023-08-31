/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OrderHistory } from './OrderHistory';
import b2cProfileMock from '../../../mocks/b2c-profile';

export default {
  title: 'Features/Account/Profile/Components/OrderHistory',
  component: OrderHistory
};

type Props = React.ComponentProps<typeof OrderHistory>;

const orders = b2cProfileMock
  .me()
  .Query.me()
  .orders.edges.map(e => e.node);

export const Default = (args: Props) => <OrderHistory {...args} />;
Default.args = {
  orders
} as Props;

// -----------------------------------------------------------

export const Skeleton = () => <OrderHistory.Skeleton />;
