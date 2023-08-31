/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { format, addMonths } from 'date-fns';
import { Printer, Download } from '@carbon/react/icons';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Card, CardTitle, CardSection, CardFooter } from '@exo/frontend-components-base';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { formatDate } from '@exo/frontend-common-i18n';
import { Order } from '@exo/frontend-features-automotive-account-logic';
import * as S from './OrderCard.styles';
import { DeliveryProgress } from '../DeliveryProgress/DeliveryProgress';

export const OrderCard = ({ order }: { order: Order }) => {
  const product = order?.lineItems?.length > 0 ? order?.lineItems[0] : undefined;
  return (
    <S.AutoOrderCard>
      <Card variant="horizontal">
        <CardSection type="media">
          <S.ThumbnailWrapper>
            <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <div className="cds--aspect-ratio--object">
                <S.Thumbnail src={getClientImagePath(product?.item.thumbnail)} />
              </div>
            </div>
          </S.ThumbnailWrapper>
        </CardSection>
        <CardTitle primaryAction={{ label: 'Print', onClick: () => {}, icon: <Printer size={16} /> }}>
          <div>Order Reference #${order?.id}</div>
        </CardTitle>
        <CardSection>
          <DeliveryProgress
            status={order.status}
            steps={[
              {
                label: 'Order placed',
                secondaryLabel: order.placedDate && formatDate(order.placedDate, 'dd/mm/yyyy')
              },
              {
                label: 'Preparing your new car'
              },
              {
                label: 'Ready for pickup/delivery'
              },
              {
                label: 'Complete'
              }
            ]}
          />
          <h4>Your ordered car</h4>
          <S.ProductName>{product?.item.name}</S.ProductName>
          Estimated delivery time:{' '}
          {order?.updateDate?.length === 0
            ? format(addMonths(new Date(), 1), 'MMMM yyyy')
            : formatDate(order?.updateDate, 'MMMM yyyy')}
          <p>
            Amount paid so far:{' '}
            <S.LinePrice>
              <MonetaryAmount
                value={product?.linePrice.value}
                currency={product?.linePrice.currency}
              />
            </S.LinePrice>
          </p>
        </CardSection>
        <CardFooter
          primaryActions={[{ label: 'Track Order', onClick: () => {} }]}
          tertiaryActions={[{ label: 'Download', onClick: () => {}, icon: <Download size={16} /> }]}
        />
      </Card>

      <br />
      <br />
    </S.AutoOrderCard>
  );
};
