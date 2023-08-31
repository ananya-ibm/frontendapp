/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Cart } from '@exo/frontend-features-cart-logic';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { useHistory } from 'react-router';
import { formatMoney } from '@exo/frontend-common-i18n';
import * as S from './OrderPanel.styles';

export const OrderPanel = ({ cart }: { cart?: Cart }) => {
  const history = useHistory();
  return (
    <S.OrderPanel>
      <S.PanelTop>
        <S.PanelTitle>Your current order</S.PanelTitle>
      </S.PanelTop>
      {cart ? (
        <S.PanelContent>
          <div>
            You have an active order with {cart.lineItems.reduce((p, c) => p + c.quantity, 0)} items
            with total cost of {formatMoney(cart.grandTotal.value, cart.grandTotal.currency)}{' '}
          </div>
          <S.Buttons>
            <ButtonGroup isLeft={false}>
              <Button label="Continue" onClick={() => history.push('/shop?cart=true')} />
            </ButtonGroup>
          </S.Buttons>
        </S.PanelContent>
      ) : (
        <S.PanelContent>
          <div>You currently have no active order</div>
          <S.Buttons>
            <ButtonGroup isLeft={false}>
              <Button label="Create new order" onClick={() => history.push('/shop?cart=true')} />
            </ButtonGroup>
          </S.Buttons>
        </S.PanelContent>
      )}
    </S.OrderPanel>
  );
};
