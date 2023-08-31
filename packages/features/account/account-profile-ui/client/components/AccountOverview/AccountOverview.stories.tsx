/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AccountOverview } from './AccountOverview';
import b2cProfileMock from '../../../mocks/b2c-profile';

export default {
  title: 'Features/Account/Profile/Components/AccountOverview',
  component: AccountOverview
};

type Props = React.ComponentProps<typeof AccountOverview>;

const orders = b2cProfileMock
  .me()
  .Query.me()
  .orders.edges.map(e => e.node);

export const Default = (args: Props) => <AccountOverview {...args} />;
Default.args = {
  orders
} as Props;

// -----------------------------------------------------------

export const Skeleton = () => <AccountOverview.Skeleton />;
