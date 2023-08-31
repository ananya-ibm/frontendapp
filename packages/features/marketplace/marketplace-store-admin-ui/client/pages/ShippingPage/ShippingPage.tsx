/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { ManageShippingContainer } from '@exo/frontend-features-marketplace-logic';
import { Shipping } from '../../components/Shipping/Shipping';

export const ShippingPage = () => {
  return (
    <Dashboard title="Shipping">
      <ManageShippingContainer
        render={({ shippingMethods }) => <Shipping shippingMethods={shippingMethods} />}
      />
    </Dashboard>
  );
};
