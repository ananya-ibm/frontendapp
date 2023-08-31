/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { ReactElement, useCallback } from 'react';
import { useNotificationContext } from '@exo/frontend-common-notification';
import { useCartModification } from '@exo/frontend-features-cart-logic';
import { useWishlists } from './hooks/useWishlists';
import { useWishlistModification } from './hooks/useWishlistModification';
import { MonetaryAmount } from './monetaryAmount';

export type Wishlist = {
  id: string;
  lineItems: {
    id: string;
    quantity: number;
    item: {
      partnumber: string;
      name: string;
      id: string;
      description: string;
      thumbnail?: string;
      price?: {
        list: MonetaryAmount;
        offer: MonetaryAmount;
      };
      selection?: {
        id: string;
        criteria: {
          id: string;
          criteriaId: string;
          name: string;
          value: {
            id: string;
            value: string;
          };
        }[];
      }[];
    };
  }[];
};

// TODO: Remove use of session context
export const WishlistContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { createNotification: notify } = useNotificationContext()!;
  const { data, loading, error } = useWishlists();

  const wishlistModification = useWishlistModification();
  const cartModification = useCartModification();

  const update = useCallback(
    async (id: string, qty: number | string) => {
      await wishlistModification.update(data?.me?.wishlists[0]!.id, [
        { id, quantity: Number(qty) }
      ]);
    },
    [wishlistModification, data]
  );

  const addtoCart = useCallback(
    async (qty: number, partnumber: string, id: string) => {
      await cartModification
        .add({
          quantity: qty,
          partnumber,
          id
        })
        .then(() =>
          notify({
            kind: 'success',
            title: 'Product added to basket'
          })
        )
        .catch(err =>
          notify({
            kind: 'error',
            title: JSON.stringify(err.message)
          })
        );
    },
    [cartModification]
  );

  const AllItemToCart = useCallback(
    (wishlist: Wishlist) => {
      wishlist?.lineItems.map(item => {
        return addtoCart(item.quantity, item.item.partnumber, item.id);
      });
    },
    [cartModification]
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const wishlist = data?.me?.wishlists[0]!;
  return render({
    wishlist,
    onItemUpdate: update,
    onAddToCart: addtoCart,
    onAddAllItemToCart: AllItemToCart
  });
};

type Props = SmartComponentProps<{
  render: (args: WishlistContainerRenderProps) => ReactElement | null;
}>;

export type WishlistContainerRenderProps = {
  wishlist: Wishlist;
  onItemUpdate?: (id: string, qty: string | number) => Promise<void> | void;
  onAddToCart: (qty: number, partnumber: string, id: string) => Promise<void> | void;
  onAddAllItemToCart?: (wishlist: Wishlist) => Promise<void> | void | any;
};
