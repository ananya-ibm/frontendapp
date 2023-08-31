/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './MiniCart.styles';
import { ShoppingBag } from '@carbon/react/icons';

export const MiniCart = ({ count = 0 }: Props) => {
  const intl = useIntl('features.cart.cart-ui.components');
  return (
    <>
      <S.MiniCart to="/cart/cart" className="hover-header" aria-label="Cart Link">
        {count > 0 && <S.CartCount data-testid="cart-MiniCart-CartCount">{count}</S.CartCount>}
        <span className="sr">{intl.msg('MiniCart.Title', 'Mini Cart')}</span>
        <ShoppingBag size="20" />
      </S.MiniCart>
    </>
  );
};

type Props = {
  count?: number;
};
