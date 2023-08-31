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

import * as S from './SummaryTile.styles';

export const SummaryTile = ({
  title,
  text = '',
  amount,
  version = '',
  thumbnail,
  onChange,
  changeButtonText
}: Props) => {
  return (
    <S.SummaryTile>
      {thumbnail && <S.Thumbnail image={thumbnail} />}
      <S.Content>
        {title && <S.Title> {title} </S.Title>}
        <div>
          {text && <S.Text>{text} </S.Text>}
          {amount && (
            <S.Cost>
              <MonetaryAmount
                prefix={amount.prefix}
                currency={amount.currency}
                value={amount.value}
              />
            </S.Cost>
          )}
          {version && <S.Version> {version}</S.Version>}
        </div>
        {onChange && <Button variant="link" onClick={onChange} label={changeButtonText} />}
      </S.Content>
    </S.SummaryTile>
  );
};

type Props = {
  title: string;
  text?: string;
  amount?: {
    prefix?: string;
    currency?: string;
    value: string | number;
  };
  version?: string;
  thumbnail: string;
  onChange: (arg?: any) => void;
  changeButtonText: string;
};
