/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Card, CardTitle, CardSection } from '@exo/frontend-components-base';
import { Information } from '@carbon/react/icons';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { PaymentsContainerRenderProps } from '@exo/frontend-features-automotive-account-logic';
import * as S from './Payments.styles';

const PaymentCard = ({
  refer,
  referNumber,
  order,
  orderNumber,
  title,
  approveDate,
  cost,
  payment
}: Props) => {
  return (
    <Card>
      <CardTitle>
        <div>
          {refer} {referNumber}
        </div>
      </CardTitle>
      <CardSection>
        <div className="refer-wrapper" style={{ marginTop: '0.75rem' }}>
          <div className="refer-text">{order}</div>
          <div className="refer-number">{orderNumber}</div>
        </div>
        <div className="highlighted-row">
          {title}
          <Information size={16} />
        </div>
        <div>{approveDate}</div>

        <div className="highlighted-row">{cost}</div>
        <div>{payment}</div>
      </CardSection>
    </Card>
  );
};

type Props = {
  refer?: string;
  referNumber?: string;
  order?: string;
  orderNumber?: string;
  title?: string;
  approveDate?: string;
  cost?: string;
  payment?: string;
};

export const Payments = ({ payments }: PaymentsContainerRenderProps) => {
  return (
    <S.Payments>
      <LayoutSpacing size="sm" />
      {payments?.map(item => (
        <PaymentCard
          key={item.refer}
          refer={item.refer}
          referNumber={item.referNumber}
          order={item.order}
          orderNumber={item.orderNumber}
          title={item.title}
          approveDate={item.approveDate}
          cost={item.cost}
          payment={item.payment}
        />
      ))}
    </S.Payments>
  );
};
