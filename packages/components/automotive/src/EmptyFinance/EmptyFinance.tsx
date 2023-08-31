/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import * as S from './EmptyFinance.styles';

export const EmptyFinance = ({ chooseFinanceText, onClickChooseFinance, text }: Props) => {
  return (
    <S.EmptyFinance>
      <S.Title>Your finance option</S.Title>
      {text && <S.BoldText>{text}</S.BoldText>}
      <S.Content>
        <Button variant="secondary" label={chooseFinanceText} onClick={onClickChooseFinance} />
      </S.Content>
    </S.EmptyFinance>
  );
};

type Props = {
  chooseFinanceText?: string;
  onClickChooseFinance?: () => void;
  text?: string;
};
