/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BnkAccountsContainer } from '@exo/frontend-features-banking-logic';
import { BnkAccounts } from '../../components/BnkAccounts/BnkAccounts';
import { AccountHero } from '@exo/frontend-components-content';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { useIntl } from '@exo/frontend-common-i18n';

export const BnkAccountsPage = ({}: Props) => {
  const intl = useIntl('features.banking.banking-ui.pages.BnkAccountsPage');
  return (
    <div>
      <AccountHero title={intl.msg('hero.title', 'Accounts')} />
      <CmsContainer name="bankingaccountscontainer">
        <CmsSpot name="bankingaccountsspot" />
      </CmsContainer>
      <BnkAccountsContainer render={props => <BnkAccounts {...props} />} />
    </div>
  );
};

type Props = {};
