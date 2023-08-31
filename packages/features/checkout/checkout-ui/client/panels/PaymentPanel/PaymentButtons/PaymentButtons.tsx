/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ButtonGroup, Button } from '@exo/frontend-components-base';

import * as S from './PaymentButton.styles';

export const PaymentButtons = ({ prevText='Previous', onPrev, nextText='Confirm and Pay', onNext, isNextDisabled=false }: Props) => (
  <S.PaymentButtons>
    <ButtonGroup isLeft>
      <Button variant="link" onClick={onPrev} label={prevText} />
      <Button variant="primary" disabled={isNextDisabled} onClick={onNext} label={nextText} />
    </ButtonGroup>
  </S.PaymentButtons>
);

type Props = {
  isNextDisabled?: boolean;
  nextText?: string;
  onNext?: () => void;
  onPrev?: () => void;
  prevText?: string;
};
