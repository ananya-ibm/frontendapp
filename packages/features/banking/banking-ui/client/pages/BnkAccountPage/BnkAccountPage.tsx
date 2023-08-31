/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AccountHero } from '@exo/frontend-components-content';
import {
  BnkAccountContainer,
  BnkTransactionsContainer
} from '@exo/frontend-features-banking-logic';
import { BnkAccount } from '../../components/BnkAccount/BnkAccount';
import { BnkTransactions } from '../../components/BnkTransactions/BnkTransactions';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { useParams } from 'react-router';
import { useIntl } from '@exo/frontend-common-i18n';

const BnkAccountPage = () => {
  const intl = useIntl('features.banking.banking-ui.pages.BnkAccountPage');
  const { accountId }: { accountId: string } = useParams();

  return (
    <>
      <AccountHero title={intl.msg('hero.title', 'View Account')} />
      <CmsContainer name="bankingaccountcontainer">
        <CmsSpot name="bankingaccountspot" />
      </CmsContainer>
      <BnkAccountContainer
        accountId={accountId}
        render={({ data }) => <BnkAccount data={data} />}
      />
      <BnkTransactionsContainer
        accountId={accountId}
        render={({ data }) => <BnkTransactions data={data} />}
      />
    </>
  );
};

export default BnkAccountPage;
