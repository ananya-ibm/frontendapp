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
import { StoredPaymentMethodsContainer } from '@exo/frontend-features-account-profile-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import { PaymentMethods } from '../../components/PaymentMethods/PaymentMethods';

export const PaymentPage = () => {
  const intl = useIntl('features.account.account-profile-ui.pages');
  return (
    <Dashboard title={intl.msg('PaymentPage.Paymentmethod.Title', 'Payment methods') as string}>
      <StoredPaymentMethodsContainer
        render={args => <PaymentMethods {...args} />}
        renderLoading={() => <PaymentMethods.Skeleton />}
      />
    </Dashboard>
  );
};
