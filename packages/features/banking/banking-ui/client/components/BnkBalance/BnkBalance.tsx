/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './BnkBalance.styles';
import { BnkBalanceContainerRenderProps } from '@exo/frontend-features-banking-logic';
import { useIntl } from '@exo/frontend-common-i18n';

export const BnkBalance = ({ data }: Props) => {
  const intl = useIntl('features.banking.banking-ui.components.BnkBalance');

  return (
    <S.BnkBalance>
      <S.BnkBalanceTotal>
        {data.amount.amount} {data.amount.currency}
      </S.BnkBalanceTotal>
      <S.BnkCreditLine>
        {intl.msg('balance.credit-line', 'Arranged overdraft limit: ')}{data.creditLine[0].amount.amount} {data.creditLine[0].amount.currency}
      </S.BnkCreditLine>
    </S.BnkBalance>
  );
};

type Props = BnkBalanceContainerRenderProps & {
  data: any;
};
