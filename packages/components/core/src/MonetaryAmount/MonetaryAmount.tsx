/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-unreachable, no-else-return */
import React from 'react';
import { formatMoney, useIntl } from '@exo/frontend-common-i18n';
import * as S from './MonetaryAmount.styles';

// TODO: Test/handle what happens when there's a priceObject by no list price

export const MonetaryAmount = ({
  value,
  currency = 'GBP',
  rate,
  prefix,
  format,
  priceObject,
  quantity = 1
}: Props) => {
  const intl = useIntl();

  if (priceObject) {
    return (
      <S.MonetaryAmount>
        {priceObject.offer && Number(priceObject.offer.value) < Number(priceObject.list?.value) ? (
          <>
            <div className="price-list">
              {prefix && <span className="prefix">{prefix}</span>}
              <span className="value">
                {formatMoney(
                  Number(priceObject.list?.value) * quantity,
                  priceObject.list?.currency,
                  format ?? intl.locale
                )}
              </span>
              {rate && <span className="rate">{rate}</span>}
            </div>
            <div className="price-offer">
              {prefix && <span className="prefix">{prefix}</span>}
              <span className="value">
                {formatMoney(
                  Number(priceObject.offer.value) * quantity,
                  priceObject.offer.currency,
                  format ?? intl.locale
                )}
              </span>
              {rate && <span className="rate">{rate}</span>}
            </div>
          </>
        ) : (
          <>
            {prefix && <span className="prefix">{prefix}</span>}
            <span className="value">
              {formatMoney(
                Number(priceObject.list?.value) * quantity,
                priceObject.list?.currency,
                format ?? intl.locale
              )}
            </span>
            {rate && <span className="rate"> {rate}</span>}
          </>
        )}
      </S.MonetaryAmount>
    );
  } else {
    const formattedValue = formatMoney(Number(value!) * quantity, currency, format ?? intl.locale);
    return (
      <S.MonetaryAmount>
        {prefix && <span className="prefix">{prefix}</span>}
        <span className="value">{formattedValue && formattedValue}</span>
        {rate && <span className="rate"> {rate}</span>}
      </S.MonetaryAmount>
    );
  }
};

type Props = {
  value?: number | string;
  priceObject?: {
    list?: {
      value: number | string;
      currency: string;
    };
    offer?: {
      value: number | string;
      currency: string;
    };
  };
  quantity?: number;
  currency?: string;
  prefix?: string;
  rate?: string;
  format?: string;
};
