/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { OrderApprovalContainer } from '@exo/frontend-features-b2b-account-logic';
import { Order } from '../../components/Order/Order';

export const OrderPage = ({ id }: Props) => {
  return (
    <Dashboard title="Order">
      <OrderApprovalContainer orderId={id} render={args => <Order {...args} />} />
    </Dashboard>
  );
};

type Props = {
  id: string;
};
