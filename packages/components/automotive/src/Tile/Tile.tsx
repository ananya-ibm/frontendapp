/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { CheckmarkFilled } from '@carbon/react/icons';
import * as S from './Tile.styles';

export const Tile = ({ image, title, description, price, isSmall, isActive }: Props) => {
  return (
    <S.Tile isSmall={isSmall}>
      {image && (
        <S.Media isActive={isActive}>
          <S.Image image={image} />
          {isActive && <CheckmarkFilled size={16} />}
        </S.Media>
      )}
      <S.Content>
        {title && <S.Title>{title}</S.Title>}
        {price && (
          <S.Price>
            <MonetaryAmount prefix={price.prefix} currency={price.currency} value={price.value} />
          </S.Price>
        )}
        {description && <S.Description>{description}</S.Description>}
      </S.Content>
    </S.Tile>
  );
};

type Props = {
  isActive?: boolean;
  description?: string;
  image?: string;
  isSmall?: boolean;
  title: string;
  price?: {
    prefix?: string;
    currency?: string;
    value?: number | string;
  };
};
