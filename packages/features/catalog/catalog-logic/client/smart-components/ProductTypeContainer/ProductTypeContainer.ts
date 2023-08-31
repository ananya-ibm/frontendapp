/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { renderDefaultError, SmartComponentProps } from '@exo/frontend-common-utils';
import { gql } from '@apollo/client';
import { useProduct } from '../../hooks/useProduct';
import { ProductRef } from '../../model/product-ref';

export const ProductTypeContainer = ({
  productId,
  render,
  renderLoading = () => null,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useProduct<ProductTypeResponse>(
    { productId },
    ProductTypeContainer.fragment
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    productType: data?.product?.type!,
    parentProductType: data?.product?.parent?.type,
    hasPrice: !!data?.product?.price?.offer || !!data?.product?.price?.list
  });
};

ProductTypeContainer.fragment = gql`
  fragment ProductTypeContainer on PrdItem {
    id
    type
    parent {
      type
    }
    price {
      list {
        value
      }
      offer {
        value
      }
    }
  }
`;

type ProductTypeResponse = {
  id: string;
  type: 'product' | 'sku' | 'bundleOfSkus' | 'bundleOfProducts';
  parent?: {
    type: 'product' | 'sku' | 'bundleOfSkus' | 'bundleOfProducts';
  };
  price?: {
    list?: any;
    offer?: any;
  };
};

type Props = SmartComponentProps<{
  productId: ProductRef;
  render: (props: ProductTypeContainerRenderProps) => JSX.Element;
}>;

type ProductTypeContainerRenderProps = {
  productType: 'product' | 'sku' | 'bundleOfSkus' | 'bundleOfProducts';
  parentProductType?: 'product' | 'sku' | 'bundleOfSkus' | 'bundleOfProducts';
  hasPrice: boolean;
};
