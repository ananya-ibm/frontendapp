/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { Link as ReactLink } from '@exo/frontend-common-link';
import * as S from './TradeIn.styles';

export const TradeIn = ({
  registrationNumber = '',
  estimatedValue,
  text = '',
  onClickTradeIn,
  onClickTerms,
  addTradeIn
}: Props) => (
  <S.TradeIn>
    {registrationNumber && estimatedValue ? (
      <>
        <S.HeaderSection>
          <S.Title>Your Trade-in</S.Title>
          <Button
            variant="link"
            data-testid="edit-trade-in"
            label="Edit Trade-in"
            onClick={onClickTradeIn}
          />
        </S.HeaderSection>
        {registrationNumber && (
          <S.Text>
            Registration number:
            <S.BoldText data-testid="registration-number">{registrationNumber}</S.BoldText>
          </S.Text>
        )}
        {(estimatedValue || estimatedValue === 0) && (
          <S.Text>
            Estimated value:
            <S.BoldText data-testid="estimated-value">
              <MonetaryAmount
                prefix={estimatedValue.prefix}
                value={estimatedValue.value}
                currency={estimatedValue.currency}
              />
            </S.BoldText>
          </S.Text>
        )}
        {text && <S.Text>{text}</S.Text>}
      </>
    ) : (
      <>
        <S.Title>Your Trade-in</S.Title>
        <S.Content>
          <Button
            variant="secondary"
            label={addTradeIn.text}
            onClick={addTradeIn.onClick}
            data-testid="add-trade-in"
          />
        </S.Content>
      </>
    )}
    <S.FooterSection>
      <ReactLink href="#" onclick={onClickTerms}>
        Terms and conditions
      </ReactLink>
    </S.FooterSection>
  </S.TradeIn>
);

type Props = {
  registrationNumber?: string;
  estimatedValue?: {
    value?: string;
    currency?: string;
    prefix?: string;
  };
  text?: string;
  onClickTradeIn?: () => void;
  onClickTerms?: () => void;
  addTradeIn: {
    text?: string;
    onClick?: () => void;
  };
};
