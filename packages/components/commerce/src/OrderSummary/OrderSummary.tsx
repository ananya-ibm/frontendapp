/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { MonetaryAmount } from '@exo/frontend-components-core';
import * as S from './OrderSummary.styles';

export const OrderSummary = ({
  summaryTitle = 'ORDER SUMMARY',
  subTotalText = 'Subtotal',
  subTotalPrice,
  totalItems,
  discountText = 'Rewards/Discounts',
  discountPrice,
  shippingText = 'Shipping',
  shippingCharge,
  totalDays,
  taxCharges,
  taxText = 'Tax',
  orderTotal = 'Order Total:',
  orderTotalPrice
}: Props) => {
  return (
    <S.OrderSummary>
      <Grid>
        <Row>
          <Column sm={'100%'}>
            <S.Heading> {summaryTitle}</S.Heading>
            <hr className="subRows" />
            <Row className="subRows">
              {subTotalPrice && (
                <>
                  <Column sm="50%" className="tableColumn">
                    {subTotalText}
                    {totalItems && <>{` (${totalItems} items)`}</>}
                  </Column>
                  <Column sm="50%" className="priceColumn">
                    <MonetaryAmount
                      value={subTotalPrice.value}
                      currency={subTotalPrice.currency}
                      format={subTotalPrice.format}
                    />
                  </Column>
                </>
              )}
            </Row>
            <Row className="subRows">
              {discountPrice && (
                <>
                  <Column sm="50%" className="tableColumn">{discountText}</Column>
                  <Column sm="50%" className="priceColumn">
                    <MonetaryAmount
                      value={discountPrice.value}
                      currency={discountPrice.currency}
                      format={discountPrice.format}
                      prefix={discountPrice.prefix}
                    />
                  </Column>
                </>
              )}
            </Row>
            <Row className="subRows">
              {shippingCharge && (
                <>
                  <Column sm="50%" className="tableColumn">
                    {shippingText}
                    {totalDays && <>{` (${totalDays} Day)`}</>}
                  </Column>
                  <Column sm="50%" className="priceColumn">
                    <MonetaryAmount
                      value={shippingCharge.value}
                      currency={shippingCharge.currency}
                      format={shippingCharge.format}
                    />
                  </Column>
                </>
              )}
            </Row>
            <Row className="subRows">
              {taxCharges && (
                <>
                  <Column sm="50%" className="tableColumn">{taxText}</Column>
                  <Column sm="50%" className="priceColumn">
                    <MonetaryAmount
                      value={taxCharges.value}
                      currency={taxCharges.currency}
                      format={taxCharges.format}
                    />
                  </Column>
                </>
              )}
            </Row>
            <Row className="subRows">
              {orderTotalPrice && (
                <>
                  <Column sm="50%" className="tableColumn">
                    <S.BoldText>{orderTotal}</S.BoldText>
                  </Column>
                  <Column sm="50%" className="priceColumn">
                    <S.BoldText>
                      <MonetaryAmount
                        value={orderTotalPrice.value}
                        currency={orderTotalPrice.currency}
                        format={orderTotalPrice.format}
                      />
                    </S.BoldText>
                  </Column>
                </>
              )}
            </Row>
          </Column>
        </Row>
      </Grid>
    </S.OrderSummary>
  );
};

type Money = {
  value?: string;
  currency?: string;
  format?: string;
};

type Props = {
  subTotalText?: string;
  summaryTitle?: string;
  subTotalPrice: Money;
  totalItems?: number;
  totalDays?: number;
  discountText?: string;
  discountPrice: {
    value?: string;
    currency?: string;
    format?: string;
    prefix?: string;
  };
  shippingText?: string;
  shippingCharge: Money;
  taxText?: string;
  taxCharges: Money;
  orderTotal?: string;
  orderTotalPrice: Money;
};
