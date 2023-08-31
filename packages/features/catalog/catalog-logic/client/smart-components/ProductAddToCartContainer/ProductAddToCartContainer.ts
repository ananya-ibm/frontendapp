/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import { useCartModification } from '@exo/frontend-features-cart-logic';
import { useWishlistModification } from '@exo/frontend-features-wishlist-logic';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useProduct } from '../../hooks/useProduct';
import { asProductRef, ProductRef } from '../../model/product-ref';

const TYPES_OK = ['sku', 'bundleofskus'];
const TYPES_OK_WHEN_AUTO = [...TYPES_OK, 'product', 'bundleofproducts'];

// TODO: We should add currency here - needed for CT at least
export const ProductAddToCartContainer = ({
  productId,
  productType,
  hasPrice,
  autoSelectSku,
  hasWishlist = true,
  onSuccess,
  onFailure,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const refProduct = asProductRef(productId);

  const hasNeededData = !!productType && (refProduct.isId || refProduct.isPartnumber);

  // TODO: This is still depending on session and config -> not really what we want
  const cart = useCartModification();
  const wishlist = useWishlistModification();

  const { loading, data, error } = useProduct<AddToCartProduct>(
    { productId, skip: hasNeededData },
    ProductAddToCartContainer.fragment
  );

  if (error) return renderError(error);
  if (!hasNeededData && (loading || !data)) return renderLoading();

  const eProductType = data?.product?.type ?? productType;

  return render({
    isEnabled: hasPrice !== false && (autoSelectSku ? TYPES_OK_WHEN_AUTO : TYPES_OK).includes(eProductType.toLowerCase()),
    onAddToCart: async (qty: number) => cart
      .add({
        quantity: qty,
        partnumber: refProduct.isPartnumber ? refProduct.ref : data?.product?.partnumber,
        id: refProduct.isId ? refProduct.ref : data?.product?.id
      })
      .then(onSuccess)
      .catch(onFailure),
    onAddToFavorites: hasWishlist
      ? async (qty: number) => {
          const wishlistId = await wishlist.getOrCreateWishlist();
          wishlist
            .add(wishlistId, {
              quantity: qty,
              partnumber: refProduct.isPartnumber ? refProduct.ref : data?.product?.partnumber
            })
            // TODO: Fix message when adding to favorite instead of cart
            .then(onSuccess)
            .catch(onFailure);
        }
      : undefined
  });
};

ProductAddToCartContainer.fragment = gql`
  fragment ProductAddToCartInfo on PrdItem {
    id
    partnumber
    type
  }
`;

type AddToCartProduct = {
  id: string;
  partnumber: string;
  type: string;
};

type Props = SmartComponentProps<{
  productId: ProductRef;
  productType: 'sku' | 'product' | 'bundleOfSkus' | 'bundleOfProducts';
  autoSelectSku?: boolean;
  hasWishlist?: boolean;
  hasPrice?: boolean;
  onSuccess: () => void;
  onFailure: (error: any) => void;
  render: (props: ProductAddToCartContainerRenderProps) => JSX.Element;
}>;

export type ProductAddToCartContainerRenderProps = {
  isEnabled: boolean;
  onAddToCart: (qty: number) => Promise<void>;
  onAddToFavorites?: (qty: number) => Promise<void>;
};
