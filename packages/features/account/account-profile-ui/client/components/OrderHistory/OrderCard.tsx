/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { format, addMonths } from 'date-fns';
import { Card, CardTitle, CardSection, CardFooter } from '@exo/frontend-components-base';
import { Printer, Download } from '@carbon/react/icons';
import { PriceTable } from '@exo/frontend-components-core';
import { formatDate } from '@exo/frontend-common-i18n';
import { getClientImagePath } from '@exo/frontend-common-utils';
import * as S from './OrderCard.styles';

const OrderCard = ({ order }) => {
  const product = order?.lineItems?.length > 0 ? order?.lineItems[0] : null;
  const priceBreakdown = order?.lineItems?.reduce(
    (acc, lineItem) => {
      acc.unshift({
        text: lineItem.item.name,
        amount: {
          prefix: '+',
          currency: lineItem.linePrice.currency,
          value: lineItem.linePrice.value
        }
      });
      return acc;
    },
    [
      {
        text: 'Order total',
        amount: {
          prefix: '+',
          currency: order.grandTotal.currency,
          value: order.grandTotal.value
        }
      }
    ]
  );
  return (
    <S.OrderCard>
      <Card variant="horizontal">
        <CardSection type="media">
          <S.ThumbnailWrapper>
            <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
              <div className="cds--aspect-ratio--object">
                <S.Thumbnail src={getClientImagePath(product.item.thumbnail)} />
              </div>
            </div>
          </S.ThumbnailWrapper>
        </CardSection>
        <CardTitle primaryAction={{ label: 'Print', onClick: () => {}, icon: <Printer size={16} /> }}>
          Order #{order?.id}
        </CardTitle>

        <CardSection>
          <S.MetaData>
            Estimated delivery time:{' '}
            <S.InteractiveText>
              {order?.updateDate?.length === 0
                ? format(addMonths(new Date(), 1), 'MMMM yyyy')
                : formatDate(order?.updateDate, 'MMMM yyyy')}
            </S.InteractiveText>
          </S.MetaData>
          <S.MetaData>
            Status: <S.InteractiveText>{order?.status || 'Unknown'}</S.InteractiveText>
          </S.MetaData>
          <S.MetaData>
            Deliver To: Delivery location: 76-78 Upper Ground, Bishops, London SE1 9PZ
          </S.MetaData>

          <S.PriceTable>
            <PriceTable priceBreakdown={priceBreakdown} />
          </S.PriceTable>
        </CardSection>

        <CardFooter
          primaryActions={[
            { label: 'Track Order', onClick: () => {} },
            { label: 'Reorder', onClick: () => {} }
          ]}
          tertiaryActions={[{ label: 'Download', onClick: () => {}, icon: <Download size={16} /> }]}
        />
      </Card>
    </S.OrderCard>
  );
};

export default OrderCard;
