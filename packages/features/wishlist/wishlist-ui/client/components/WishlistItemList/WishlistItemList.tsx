/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Wishlist, WishlistContainerRenderProps } from '@exo/frontend-features-wishlist-logic';
import {  Button } from '@exo/frontend-components-base';
import * as S from './WishlistItemList.styles';
import { WishlistItem } from './WishlistItem/WishlistItem';


export const WishlistItemList = ({ wishlist, onItemUpdate = () => {}, onAddToCart, onAddAllItemToCart = () => {}, isReadOnly = false }: Props) => {
  return (
    <div>
    <Button
            size="field"
            onClick={() => onAddAllItemToCart(wishlist)}
            label={('Add to cart')}
    />
    <S.WishlistItemList>
      { wishlist?.lineItems.map(item => (
        <WishlistItem key={item.item.id} item={item} onUpdate={onItemUpdate} onAddToCart ={onAddToCart}  isReadOnly={isReadOnly} />
      ))}
    </S.WishlistItemList>
    </div>
  );

};

type Props = Omit<WishlistContainerRenderProps, 'wishlist'> & {
  wishlist: Wishlist;
  isReadOnly?: boolean;
  hasTotal?: boolean;
  onAllItemToCart?: (wishlist: Wishlist) => Promise<void> | void | any;
};

WishlistItemList.Skeleton = () => {
  return (
    <S.WishlistItemList>
      <WishlistItem.Skeleton />
    </S.WishlistItemList>
  );
};
