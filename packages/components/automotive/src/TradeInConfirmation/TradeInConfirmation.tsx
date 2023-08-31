/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { format } from 'date-fns';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import * as S from './TradeInConfirmation.styles';

export const TradeInConfirmation = ({ valuation, onRemoveClick, onAcceptClick, date }: Props) => (
  <S.TradeInConfirmation>
    <S.Title>Estimated Valuation for your current car at {format(date, 'dd/MM/yyyy')}:</S.Title>

    {(valuation.make || valuation.model) && (
      <div>
        <S.Text>Car model:</S.Text>
        {valuation.make} {valuation.model}, {valuation.year}
      </div>
    )}

    {valuation.registration && (
      <div>
        <S.Text>Registration number:</S.Text>
        {valuation.registration}
      </div>
    )}

    {valuation.mileage && (
      <div>
        <S.Text>Mileage:</S.Text>
        {parseFloat(valuation.mileage?.toString()).toLocaleString()}
      </div>
    )}

    <S.LinkButton>
      <Button variant="link" label="Not your car?" />
    </S.LinkButton>

    <S.ValuationSection>
      <div>
        {valuation.oneMonthValue && (
          <div>
            <S.Text>Valuation in 1 month:</S.Text>
            <MonetaryAmount {...valuation.oneMonthValue} />
          </div>
        )}
        {valuation.twoMonthValue && (
          <div>
            <S.Text>Valuation in 2 months:</S.Text>
            <MonetaryAmount {...valuation.twoMonthValue} />
          </div>
        )}
      </div>
      {valuation.value && (
        <S.CurrentValuation>
          Valuation Today:
          <S.Cost>
            <MonetaryAmount {...valuation.value} />
          </S.Cost>
          <Button variant="link" label="Terms and conditions" />
        </S.CurrentValuation>
      )}
    </S.ValuationSection>

    <S.ButtonGroup>
      <Button variant="secondary" onClick={onRemoveClick} label="Remove" />
      <S.ConfirmationButton>
        <Button onClick={onAcceptClick} label="Accept" />
      </S.ConfirmationButton>
    </S.ButtonGroup>
  </S.TradeInConfirmation>
);

type Props = {
  date: Date;
  valuation: {
    condition: string;
    id: string;
    make: string;
    mileage: number | string;
    model: string;
    registration: string;
    value: {
      value: number | string;
      currency: string;
    };
    oneMonthValue: {
      value: number | string;
      currency: string;
    };
    twoMonthValue: {
      value: number | string;
      currency: string;
    };
    year: number | string;
  };
  onRemoveClick: () => void;
  onAcceptClick: () => void;
};
