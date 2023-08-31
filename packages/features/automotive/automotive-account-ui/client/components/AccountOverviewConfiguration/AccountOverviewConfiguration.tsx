/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Row, Column } from '@exo/frontend-components-base';
import { LayoutSpacing, MonetaryAmount } from '@exo/frontend-components-core';
import { Information } from '@carbon/react/icons';
import * as S from './AccountOverviewConfiguration.styles';

export const AccountOverviewConfiguration = ({
  conf = {
    id: '36db7c02552ab7005e78d3c0942a1ee6',
    productId: 'DeLoreanTimeMachineDeluxe',
    description: '1.21 GW coupe 2 door 2 seats nuclear 5-speed manual 3-speed automatic 2900 hp',
    amount: { value: '9,1639', currency: 'GBP' }
  }
}: Props) => {
  return (
    <>
      <Row>
        <Column lg={12}>
          <div>
            {conf.id && <S.LeftHeadingText>Configuration Code: {conf.id}</S.LeftHeadingText>}
          </div>
        </Column>
      </Row>
      <Row>
        <Column lg={5}>
          <div>{conf.productId}</div>
          <div>{conf.description}</div>
        </Column>
        <Column lg={5}>
          <S.EstimatedTotal>
            <MonetaryAmount
              value={conf.amount.value}
              currency={conf.amount.currency}
              prefix="Estimated Total"
            />
          </S.EstimatedTotal>
          <span>
            <Information size={16} /> OTR Price, no finance
          </span>
        </Column>
      </Row>
      <LayoutSpacing size="xs" />
    </>
  );
};

type Props = {
  conf?: {
    id?: string;
    productId?: string;
    description?: string;
    amount?: any;
  };
};
