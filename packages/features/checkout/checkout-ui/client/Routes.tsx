/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Route } from 'react-router-dom';
import React from 'react';
import { AppShellSwitch } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { CheckoutConfig } from './checkoutConfig';
import { useSessionContext } from '@exo/frontend-common-session-context';

export const Routes = ({ config }: Props) => {
  const session = useSessionContext();
  const store = session?.checkout?.storeId;
  const shippingModeId = session?.checkout?.shippingMode;
  return (
    <AppShellSwitch prefix="/checkout" missing={PageNotFound}>
      <Route
        path="/checkout/checkout"
        render={() => {
          return (
            <CheckoutPage config={config} store={store} shippingModeId={shippingModeId}
            />
          );
        }}
      />
      <Route path="/checkout/confirmation" component={ConfirmationPage} />
    </AppShellSwitch>
  );
};

type Props = {
  config: CheckoutConfig;
};
