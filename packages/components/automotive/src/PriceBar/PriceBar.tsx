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
import * as S from './PriceBar.styles';

export const PriceBar = ({
  addToCartClick = () => {},
  addToCartText = 'ADD TO CART',
  financeLinkText = 'Calculate Finance',
  subscriptionCost,
  testDriveText,
  testDriveOnClick = () => {},
  price,
  openModal = () => {},
  configurationID
}: Props) => (
  // eslint-disable-next-line react/jsx-indent
  <S.PriceBar>
    <S.Actions>
      <S.Price>
        {price && (
          <S.Cost>
            <MonetaryAmount prefix={price.prefix} value={price.value} currency={price.currency} />
            <S.Text>Purchase Price</S.Text>
          </S.Cost>
        )}
        {price && subscriptionCost ? ' or ' : ''}
        {subscriptionCost && (
          <S.Cost>
            <MonetaryAmount
              prefix={subscriptionCost.prefix}
              value={subscriptionCost.value}
              currency={subscriptionCost.currency}
              rate={subscriptionCost.rate}
            />
            <Button variant="link" label={financeLinkText} onClick={openModal} />
          </S.Cost>
        )}
      </S.Price>
      <S.ButtonGroup>
        <Button variant="secondary" onClick={() => testDriveOnClick()} label={testDriveText} />
        <Button label={addToCartText} onClick={addToCartClick} />
      </S.ButtonGroup>
    </S.Actions>
    {configurationID && (
      <>
        <S.ConfigurationId>{`Configuration ID: ${configurationID}`}</S.ConfigurationId>
        <p style={{ textAlign: 'left', paddingLeft: '0.5rem' }}>
          Share this with your dealer to recieve support from them when conifguring your dream car.
        </p>
      </>
    )}
  </S.PriceBar>
);

type Props = {
  addToCartClick?: () => void;
  addToCartText?: string;
  financeLinkText?: string;
  price: {
    value?: string;
    currency?: string;
    prefix?: string;
  };
  testDriveOnClick?: () => void;
  testDriveText?: string;
  subscriptionCost: {
    value?: string;
    currency?: string;
    prefix?: string;
    rate?: string;
  };
  openModal?: () => void;
  configurationID?: string;
};
