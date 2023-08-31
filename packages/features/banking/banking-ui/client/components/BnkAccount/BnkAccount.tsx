/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './BnkAccount.styles';
import { BnkAccountContainerRenderProps } from '@exo/frontend-features-banking-logic';
import { BnkBalanceContainer } from '@exo/frontend-features-banking-logic/client/smart-components/BnkBalanceContainer/BnkBalanceContainer';
import { BnkBalance } from '../BnkBalance/BnkBalance';
import { useIntl } from '@exo/frontend-common-i18n';

export const BnkAccount = ({ data }: Props) => {
  const intl = useIntl('features.banking.banking-ui.components.BnkAccount');
  
  return (
    <S.BnkAccount>
      <S.AccountDetails>
        <S.AccountName>{data.nickname}</S.AccountName>
        <S.AccountDetail>{intl.msg('account-detail.account-type', 'Account Type: ')}{data.accountType}</S.AccountDetail>
        <S.AccountDetail>{intl.msg('account-detail.account-number', 'Account Number: ')}{data.account[0].identification.slice(6)}</S.AccountDetail>
        <S.AccountDetail>{intl.msg('account-detail.sort-code', 'Sort Code: ')}{data.account[0].identification.slice(0, 6)}</S.AccountDetail>
        <S.AccountDetail>{intl.msg('account-detail.opened-date', 'Opened Date: ')}{data.openingDate}</S.AccountDetail>
      </S.AccountDetails>
      <BnkBalanceContainer accountId={'22289'} render={({ data: d }) => <BnkBalance data={d} />} />
    </S.BnkAccount>
  );
};

type Props = BnkAccountContainerRenderProps & {
  data: any;
};
