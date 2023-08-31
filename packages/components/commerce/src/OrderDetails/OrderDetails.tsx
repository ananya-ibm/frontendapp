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
import { getClientImagePath } from '@exo/frontend-common-utils';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import * as S from './OrderDetails.styles';

export const OrderDetails = ({
  title = 'Order Details',
  orderNumber,
  orderDate,
  billingAddress,
  shippingAddress,
  paymentMethod,
  orderStatus,
  trackingId,
  grandTotal,
  subTotalPrice,
  totalItems,
  discountPrice,
  shippingCharge,
  totalDays,
  taxCharges,
  orders
}: Props) => {
  // TODO: There's quite a bit of polish for mobile devices
  return (
    <S.OrderDetails>
      {title && <S.Heading>{title}</S.Heading>}
      <S.Field>
        <S.SubHeading>
          Order Number:<span className="orderNumber">{orderNumber}</span>
        </S.SubHeading>
      </S.Field>
      <S.Field>
        <S.Text>Date ordered:{orderDate} </S.Text>
      </S.Field>
      <Grid isFluid>
        <S.Field>
          <Row>
            <Column sm={'100%'} lg={'33%'}>
              <S.BoldText>
                <S.Text>Billing Address</S.Text>
              </S.BoldText>
              <S.Text>{billingAddress}</S.Text>
            </Column>
            <Column sm={'100%'} lg={'33%'}>
              <S.BoldText>
                <S.Text>Shipping Address</S.Text>
              </S.BoldText>
              <S.Text>{shippingAddress}</S.Text>
            </Column>
            <Column sm={'100%'} lg={'33%'}>
              <S.BoldText>
                <S.Text>Payment Method</S.Text>
              </S.BoldText>
              <S.Text>{paymentMethod}</S.Text>
            </Column>
          </Row>
        </S.Field>
        <S.OrderHeader>
          <Row>
            <Column sm={'100%'} lg={3}>
              <S.BoldText>
                <S.Text>Order Status</S.Text>
              </S.BoldText>
              {orderStatus && <S.Text>{orderStatus}</S.Text>}
            </Column>
            <Column sm={'100%'} lg={3}>
              <S.BoldText>
                <S.Text>Tracking #</S.Text>
              </S.BoldText>
              {trackingId && <S.Text>{trackingId}</S.Text>}
            </Column>
          </Row>
        </S.OrderHeader>
        {orders &&
          orders.map(li => (
            <S.OrderBody key={li.id}>
              <Row>
                <Column sm={1} md={2} lg={3}>
                  <S.Thumbnail
                    src={getClientImagePath(li.item.thumbnail)}
                    alt={`An image of ${li.item.name}`}
                  />
                </Column>
                <Column sm={1} md={3} lg={10} className="description">
                  <S.Text>{li.brandName}</S.Text>
                  <S.SubHeading>{li.item.name}</S.SubHeading>
                  <Row className="description">
                    <Column>
                      {' '}
                      <S.Text>Size: {li.size}</S.Text>
                    </Column>
                    <Column className="color">
                      {' '}
                      <S.Text>Color: {li.color}</S.Text>
                    </Column>
                  </Row>
                  <S.Text className="description">Quantity: {li.quantity}</S.Text>
                </Column>
                <Column className="priceTotal" sm={1} md={3} lg={3}>
                  <Row className="priceRow">Total Price:</Row>
                  <Row className="priceRow">
                    <S.SubHeading>
                      <MonetaryAmount
                        value={li.linePrice.value}
                        currency={li.linePrice.currency}
                        format={li.linePrice.format}
                      />
                    </S.SubHeading>
                  </Row>
                </Column>
              </Row>
            </S.OrderBody>
          ))}
        <Row>
          <Column sm='0' lg="60%"></Column>
          <Column
            sm='100%'
            lg="40%"
          >
            <S.Field>
              <OrderSummary
                subTotalPrice={subTotalPrice}
                discountPrice={discountPrice}
                totalItems={totalItems}
                shippingCharge={shippingCharge}
                totalDays={totalDays}
                taxCharges={taxCharges}
                orderTotalPrice={grandTotal}
              />
            </S.Field>
          </Column>
        </Row>
      </Grid>
    </S.OrderDetails>
  );
};

type Money = {
  value?: string;
  currency?: string;
  format?: string;
};

type Props = {
  title?: string;
  orderNumber: string;
  orderDate: string;
  billingAddress: string;
  shippingAddress: string;
  paymentMethod: string;
  orderStatus?: string;
  trackingId?: string;
  totalItems?: number;
  totalDays?: number;
  subTotalPrice: Money;
  discountPrice: Money & { prefix?: string };
  shippingCharge: Money;
  taxCharges: Money;
  grandTotal: Money;
  orders: {
    id?: string;
    quantity?: number | string;
    brandName?: string;
    size?: string;
    color?: string;
    item: {
      thumbnail?: string;
      name?: string;
    };
    linePrice: Money;
  }[];
};
