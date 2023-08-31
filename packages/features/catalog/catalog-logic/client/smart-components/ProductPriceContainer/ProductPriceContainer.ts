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
import { gql } from '@apollo/client';
import { useProduct } from '../../hooks/useProduct';
import { Product } from '../../model/types';
import { ProductRef } from '../../model/product-ref';

export const ProductPriceContainer = ({
  productId,
  currency,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useProduct<ProductPriceResponse>(
    { productId, currency },
    ProductPriceContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  const productPrice = data.product.price;
  const hasPrice = !!productPrice?.list?.value && !!productPrice?.list?.currency;
  return render({ price: hasPrice ? productPrice : {} });
};

ProductPriceContainer.fragment = gql`
  fragment ProductPriceSummary on PrdItem {
    id
    price {
      list {
        value
        currency
      }
      offer {
        value
        currency
      }
    }
  }
`;

type ProductPriceResponse = Pick<Product, 'id' | 'price'>;

type Props = SmartComponentProps<{
  productId: ProductRef;
  currency: string;
  render: (props: ProductPriceContainerRenderProps) => JSX.Element;
}>;

export type ProductPriceContainerRenderProps = {
  price: Pick<ProductPriceResponse, 'price'>['price'];
};
