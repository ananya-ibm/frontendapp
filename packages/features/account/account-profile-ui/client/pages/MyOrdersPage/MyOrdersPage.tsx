/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { OrderHistoryContainer } from '@exo/frontend-features-account-profile-logic';
import { OrderHistory } from '../../components/OrderHistory/OrderHistory';

export const MyOrdersPage = () => {
  const intl = useIntl('features.account.account-profile-ui.pages');
  return (
    <>
      <Dashboard title={intl.msg('MyOrdersPage.Myorder.Title', 'My orders') as string}>
        <OrderHistoryContainer
          render={args => <OrderHistory {...args} />}
          renderLoading={() => <OrderHistory.Skeleton />}
        />
      </Dashboard>
    </>
  );
};
