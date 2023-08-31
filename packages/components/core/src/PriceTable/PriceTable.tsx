/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { InformationFilled } from '@carbon/react/icons';
import { MonetaryAmount } from '../MonetaryAmount/MonetaryAmount';
import * as S from './PriceTable.styles';

export const PriceTable = ({ priceBreakdown }: Props) => {
  const hasHelpText = Boolean(priceBreakdown.find(item => !!item.helpText));

  return (
    <S.PriceTable hasHelpText={hasHelpText}>
      {priceBreakdown.map(option => (
        <S.Row key={option.text}>
          {option.text && <S.Text>{option.text}</S.Text>}
          {option.amount && (
            <S.Price>
              <MonetaryAmount
                prefix={option.amount.prefix}
                currency={option.amount.currency}
                value={parseFloat(option.amount.value?.toString() ?? '0').toFixed(2)}
              />
            </S.Price>
          )}
          {option.value && <S.Price>{option.value}</S.Price>}
          {option.helpText && (
            <S.Help title={option.helpText}>
              <InformationFilled size={32} />
              <span className="sr">{option.helpText}</span>
            </S.Help>
          )}
        </S.Row>
      ))}
    </S.PriceTable>
  );
};

type Props = {
  priceBreakdown: {
    text?: string;
    amount: {
      prefix?: string;
      currency?: string;
      value: string | number;
    };
    value?: string | number;
    helpText?: string;
  }[];
};
