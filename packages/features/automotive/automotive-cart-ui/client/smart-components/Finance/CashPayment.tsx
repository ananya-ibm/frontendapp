/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Link } from '@exo/frontend-common-link';
import { LayoutSpacing, MonetaryAmount, PriceTable } from '@exo/frontend-components-core';
import * as S from './Finance.styles';

const CashPayment = ({ priceBreakdown }: Props) => {
  const termsLink = '#';
  const cashPrice = priceBreakdown[priceBreakdown.length - 1].amount;
  return (
    <S.TabContent>
      <S.Title>Cash Purchase (Self-funding)</S.Title>
      <LayoutSpacing size="sm" />
      <S.Title unbold>
        Total Price:{' '}
        <S.CashPrice>
          <MonetaryAmount value={cashPrice.value} currency={cashPrice.currency} />
        </S.CashPrice>
      </S.Title>
      <LayoutSpacing size="sm" />
      <PriceTable priceBreakdown={priceBreakdown} />
      <LayoutSpacing size="sm" />
      <Link href={termsLink}>Terms and conditions</Link>
    </S.TabContent>
  );
};

type Props = {
  priceBreakdown: {
    amount: {
      value: string;
      currency: string;
    };
  }[];
};

export default CashPayment;
