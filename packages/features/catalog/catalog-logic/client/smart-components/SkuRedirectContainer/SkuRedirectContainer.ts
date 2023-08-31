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
import { useEffect } from 'react';
import { gql } from '@apollo/client';
import { useProduct } from '../../hooks/useProduct';
import { Product } from '../../model/types';
import { ProductRef } from '../../model/product-ref';

export const SkuRedirectContainer = ({
  productId,
  onRedirect,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, error, data } = useProduct<RedirectResponse>(
    { productId },
    SkuRedirectContainer.fragment
  );

  const redirect = () => {
    if (loading || !data) return;

    if (data.product.type === 'sku' && data.product.parent) {
      onRedirect({
        product: data.product.parent ?? data.product,
        sku: data.product
      });
    } else {
      onRedirect({
        product: data.product.parent ?? data.product
      });
    }
  };

  useEffect(redirect, [data?.product?.id]);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  // In case of SSR, force redirect to happen synchronously
  if (typeof window === 'undefined') {
    redirect();
  }

  return render();
};

SkuRedirectContainer.fragment = gql`
  fragment ProductSkuRelation on PrdItem {
    id
    partnumber
    slug
    type
    parent {
      id
      partnumber
      slug
    }
  }
`;

type RedirectResponse = Pick<Product, 'id' | 'partnumber' | 'slug'> & {
  type: string;
  parent?: Pick<Product, 'id' | 'partnumber' | 'slug'>;
};

type Props = SmartComponentProps<{
  productId: ProductRef;
  onRedirect: (props: {
    product: Pick<Product, 'id' | 'partnumber' | 'slug'>;
    sku?: Pick<Product, 'id' | 'partnumber' | 'slug'>;
  }) => void;
  render: () => JSX.Element;
}>;
