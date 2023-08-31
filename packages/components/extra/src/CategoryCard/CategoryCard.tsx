/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Row, Column, Button } from '@exo/frontend-components-base';
import { MonetaryAmount } from '@exo/frontend-components-core';
import * as S from './CategoryCard.styles';

export const CategoryCard = ({
  title,
  price,
  text,
  img,
  primaryBtnText,
  secondaryBtnText,
  onPrimaryBtnClick,
  onSecondaryBtnClick,
  isImageRight
}: Props) => {
  return (
    <S.CategoryCard isImageRight={isImageRight}>
      <Row className="category-image">
        <Column sm="50%" className="col1">
          {img && (
            <S.Media>
              <img className="imgSize" src={img.src} alt={img.alt} />
            </S.Media>
          )}
        </Column>
        <Column sm="50%" className="col2">
          <S.ContentPanel>
            {title && <S.Title>{title}</S.Title>}
            {price && (
              <S.Amount>
                From{' '}
                <MonetaryAmount
                  prefix={price.prefix}
                  currency={price.currency}
                  value={price.value}
                />
              </S.Amount>
            )}
            {text && <S.Content>{text}</S.Content>}
            <S.Buttons>
              <Row>
                <S.Button1Padding>
                  <Column>
                    <Button onClick={onPrimaryBtnClick} label={primaryBtnText} />
                  </Column>
                </S.Button1Padding>
                <S.Button2Padding>
                  <Column>
                    <Button
                      variant="secondary"
                      onClick={onSecondaryBtnClick}
                      label={secondaryBtnText}
                    />
                  </Column>
                </S.Button2Padding>
              </Row>
            </S.Buttons>
          </S.ContentPanel>
        </Column>
      </Row>
    </S.CategoryCard>
  );
};

type Props = {
  title?: string;
  price?: {
    prefix?: string;
    currency?: string;
    value?: string | number;
  };
  text?: string;
  img: {
    src?: string;
    alt?: string;
  };
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onPrimaryBtnClick?: () => void;
  onSecondaryBtnClick?: () => void;
  isImageRight?: boolean;
};
