/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CartContainerRenderProps } from '@exo/frontend-features-cart-logic';
import * as S from './CartItemList.styles';
import { CartItem } from './CartItem/CartItem';

export const CartItemList = ({ cart, onItemUpdate = () => {}, isReadOnly = false }: Props) => {
  return (
    <S.CartItemList>
      {cart?.lineItems?.map(item => (
        <CartItem key={item.id} item={item} onUpdate={onItemUpdate} isReadOnly={isReadOnly} />
      ))}
    </S.CartItemList>
  );
};

type Props = Omit<CartContainerRenderProps, 'cart'> & {
  cart: Pick<CartContainerRenderProps['cart'], 'lineItems'>;
  isReadOnly?: boolean;
  hasTotal?: boolean;
};

CartItemList.Skeleton = () => {
  return (
    <S.CartItemList>
      <CartItem.Skeleton />
    </S.CartItemList>
  );
};
