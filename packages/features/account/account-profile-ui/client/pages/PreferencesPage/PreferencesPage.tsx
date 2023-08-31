/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Dashboard } from '@exo/frontend-features-account-dashboard-ui';
import { Preferences } from '../../components/Preferences/Preferences';

export const PreferencesPage = () => {
  const intl = useIntl('features.account.account-profile-ui.pages');
  return (
    <Dashboard title={intl.msg('PreferencesPage.Title', 'Preferences') as string}>
      <Preferences />
    </Dashboard>
  );
};
