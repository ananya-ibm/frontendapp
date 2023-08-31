/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount, PriceTable } from '@exo/frontend-components-core';
import { Link as ReactLink } from '@exo/frontend-common-link';
import * as S from './FinanceContract.styles';

export const FinanceContract = ({
  monthlyPrice,
  priceBreakdown,
  selectedFinanceOption,
  termsLink,
  totalPrice
}: Props) => {
  return (
    <S.FinanceContract>
      {selectedFinanceOption && (
        <S.Par>
          Your selected finance option is:
          <br />
          <S.Selected>{selectedFinanceOption}</S.Selected>
        </S.Par>
      )}
      {monthlyPrice && (
        <S.Par>
          Monthly price:{' '}
          <S.Selected>
            <MonetaryAmount currency={monthlyPrice.currency} value={monthlyPrice.value} />
          </S.Selected>
        </S.Par>
      )}
      {totalPrice && (
        <S.Par>
          Total to pay:{' '}
          <S.Selected>
            <MonetaryAmount currency={totalPrice.currency} value={totalPrice.value} />
          </S.Selected>
        </S.Par>
      )}
      {termsLink && (
        <S.Link>
          <ReactLink to={termsLink}>Terms and conditions</ReactLink>
        </S.Link>
      )}
      {priceBreakdown && (
        <S.Table>
          <PriceTable priceBreakdown={priceBreakdown} />
        </S.Table>
      )}
    </S.FinanceContract>
  );
};

type Props = {
  monthlyPrice: {
    prefix?: string;
    currency?: string;
    value?: string | number;
  };
  totalPrice?: {
    prefix?: string;
    currency?: string;
    value?: string | number;
  };
  priceBreakdown: {
    text?: string;
    amount: {
      prefix?: string;
      currency?: string;
      value: string | number;
    };
    value?: string | number;
    helpText?: string;
  }[];
  selectedFinanceOption?: string;
  termsLink?: string;
};
