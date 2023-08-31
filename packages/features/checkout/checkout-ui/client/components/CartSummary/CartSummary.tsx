/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Cart } from '@exo/frontend-features-cart-logic';
import * as S from './CartSummary.styles';

const defaultPriceTextMap = {
  grandTotal: 'Order total',
  totalAdjustment: 'Adjustment',
  totalSalesTax: 'Sales tax',
  totalShippingCharge: 'Shipping',
  totalShippingTax: 'Shipping tax',
  totalProductPrice: 'Item(s) subtotal'
};

export const CartSummary = ({
  priceTextMap = defaultPriceTextMap,
  cart
}: Props) => {
  const intl = useIntl('features.checkout.checkout-ui.components.CartSummary');

  const effectivePriceTextMap = { ...priceTextMap };
  // eslint-disable-next-line no-param-reassign
  effectivePriceTextMap.grandTotal = intl.msg('default.ordertotal', 'Order total') as string;
  effectivePriceTextMap.totalAdjustment = intl.msg('default.adjustments', 'Adjustment') as string;
  effectivePriceTextMap.totalSalesTax = intl.msg('default.salestax', 'Sales tax') as string;
  effectivePriceTextMap.totalShippingCharge = intl.msg('default.shipping', 'Shipping') as string;
  effectivePriceTextMap.totalShippingTax = intl.msg(
    'default.shippingtax',
    'Shipping tax'
  ) as string;
  effectivePriceTextMap.totalProductPrice = intl.msg(
    'default.sybtotal',
    'Item(s) subtotal'
  ) as string;
  const priceBreakdown = Object.entries(effectivePriceTextMap)
    .map(([k, v]) => ({
      text: v,
      amount: cart[k]
    }))
    .filter((e) => e.amount && Math.abs(e.amount.value) > 0.0001);

  return (
    <S.CartSummary>
      {priceBreakdown.map((option) => (
        <S.Row key={option.text ?? option.amount.value?.toString()}>
          <S.Label>{option.text}</S.Label>
          <S.Value>
            <MonetaryAmount
              prefix={option.amount.prefix}
              currency={option.amount.currency}
              value={parseFloat(option.amount.value?.toString() ?? '0').toFixed(2)}
            />
          </S.Value>
        </S.Row>
      ))}
    </S.CartSummary>
  );
};

CartSummary.Skeleton = () => <div>Loading...</div>;

type Props = {
  cart: Cart;
  priceTextMap?: Partial<Record<keyof Cart, string>>;
  isConfirmation?: boolean;
};
