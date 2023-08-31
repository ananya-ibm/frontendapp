/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './BnkAccounts.styles';
import { BnkAccountsContainerRenderProps } from '@exo/frontend-features-banking-logic';
import { CardTitle } from '@exo/frontend-components-base';

export const BnkAccounts = ({ data }: Props) => {
  return (
    <S.BnkAccounts>
      {data.map(account => (
        <S.BankingAccountItem>
          <CardTitle secondaryActions={[
            { label: 'Pay and transfer', onClick: () => {} },
            { label: 'Statements', onClick: () => {} },
            { label: 'Documents', onClick: () => {} }
          ]}>
            <S.BankingAccountItemLink href={'/banking/accounts/' + account.accountId}>
              {account.nickname}
            </S.BankingAccountItemLink>
          </CardTitle>
          <S.BankingAccountNumber>{account.account[0].identification.slice(0,6)} {account.account[0].identification.slice(6,14)}</S.BankingAccountNumber>
          <S.BankingAccountBalance>{account.balance[0].amount.amount} {account.currency}</S.BankingAccountBalance>
        </S.BankingAccountItem>
      ))}
    </S.BnkAccounts>
  );
};

type Props = BnkAccountsContainerRenderProps & {
  // TODO: Add any additional props
};
