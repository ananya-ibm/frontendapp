/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { CartContainerRenderProps } from '@exo/frontend-features-cart-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './CartSubtotal.styles';


type SubtotalRowProps = {
  label: string | React.ReactNode;
  value?: { value: string | number; currency: string };
  isTitle?: boolean;
};
const SubtotalRow = ({ label, value }: SubtotalRowProps) => {
  return (
    <S.Row>
      <S.Label>{label}</S.Label>
      {value && (
        <S.Value>
          <MonetaryAmount value={value.value} currency={value.currency} />
        </S.Value>
      )}
    </S.Row>
  );
};

export const CartSubtotal = ({ cart }: Props) => {
  const intl = useIntl('features.cart.cart-ui.components');
  const {
    grandTotal,
    totalProductPrice,
    totalShippingCharge,
    totalAdjustment,
    totalShippingTax,
    totalSalesTax,
    adjustments
  } = cart;
  return (
    <S.CartSubtotal>
      {totalProductPrice && <SubtotalRow label={intl.msg('CartSubtotal.Head.SubtotalRow.label', 'Subtotal')} value={totalProductPrice} />}
      {totalSalesTax && <SubtotalRow label={intl.msg('CartSubtotal.Body.SubtotalRow.SalesTax.label', 'Sales Tax')} value={totalSalesTax} />}
      {totalShippingCharge && <SubtotalRow label={intl.msg('CartSubtotal.Body.SubtotalRow.Shipping.label', 'Shipping')} value={totalShippingCharge} />}
      {totalShippingTax && <SubtotalRow label={intl.msg('CartSubtotal.Body.SubtotalRow.ShippingTax.label', 'Shipping tax')} value={totalShippingTax} />}
      {totalAdjustment?.value !== '0' &&
        (adjustments ?? []).map(adj => (
          <React.Fragment key={adj.title}>
            <SubtotalRow label={intl.msg('CartSubtotal.Body.SubtotalRow.Adjustments.label', 'Adjustments')} isTitle />
            <SubtotalRow key={adj.title} label={adj.title} value={adj.amount} />
          </React.Fragment>
        ))}
      {grandTotal && <SubtotalRow label={intl.msg('CartSubtotal.Foot.SubtotalRow.label', 'Total')} value={grandTotal} />}
    </S.CartSubtotal>
  );
};

type Props = {
  cart: Pick<
    CartContainerRenderProps['cart'],
    | 'grandTotal'
    | 'totalProductPrice'
    | 'totalShippingCharge'
    | 'totalAdjustment'
    | 'totalShippingTax'
    | 'totalSalesTax'
    | 'adjustments'
  >;
};

SubtotalRow.Skeleton = () => {
  return (
    <S.Row>
    </S.Row>
  );
};

CartSubtotal.Skeleton = () => {
  return (
    <div></div>
  );
};
