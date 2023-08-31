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
import { ResetPasswordContainer } from '@exo/frontend-features-account-profile-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import { ResetPassword } from '../../components/ResetPassword/ResetPassword';
import { AccountProfileConfig } from '../../acountProfileConfig';

export const SecurityPage = ({ config }: Props) => {
  const intl = useIntl('features.account.account-profile-ui.pages');
  return (
    <>
      <Dashboard title={intl.msg('SecurityPage.Dashboard.title', 'Account security') as string}>
        <ResetPasswordContainer
          requireOldPassword={config.feature.requireOldPasswordsWhenChanging}
          render={args => <ResetPassword {...args} />}
          renderLoading={() => <ResetPassword.Skeleton />}
        />
      </Dashboard>
    </>
  );
};

type Props = {
  config: AccountProfileConfig;
};
