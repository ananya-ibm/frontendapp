/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Button, Step, Steps } from '@exo/frontend-components-base';
import { Warning } from '@carbon/react/icons';
import * as S from './DeliveryProgress.styles';

const STATUS_MAP = {
  CAPTURED: 0,
  PENDING_PAYMENT_AUTHORIZATION: 0,
  IN_PROCESSING: 1,
  READY_FOR_PICKUP: 2,
  COLLECTED: 3,
  SHIPPED: 2,
  DELIVERED: 3,
  CANCELLED: 0,
  UNKNOWN: 0
};

export const DeliveryProgress = ({ status, steps, title }: Props) => {
  return (
    <S.DeliveryProgress>
      {title && <S.Subtitle>{title}</S.Subtitle>}
      <Steps current={STATUS_MAP[status]} className="steps">
        {steps.map(step => (
          <Step key={step.label} title={step.label} description={step.secondaryLabel} />
        ))}
      </Steps>
      <S.InfoLink>
        <Warning size={32} className="info-icon" />
        <Button variant="link" label="Do you have questions about your order" onClick={() => {}} />
      </S.InfoLink>
    </S.DeliveryProgress>
  );
};

type Props = {
  status: string;
  steps: {
    label: string;
    secondaryLabel?: string;
  }[];
  title?: string;
};
