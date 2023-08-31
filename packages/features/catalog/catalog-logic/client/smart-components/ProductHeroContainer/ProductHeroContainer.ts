/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  getClientImagePath,
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useProduct } from '../../hooks/useProduct';
import { ProductRef } from '../../model/product-ref';

export const ProductHeroContainer = ({
  productId,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useProduct<ProductHeroResponse>(
    { productId },
    ProductHeroContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({
    id: data?.product?.id,
    fullImage: getClientImagePath(data?.product?.fullImage, true, false),
    name: data?.product?.name,
    description: data?.product?.description
  });
};

ProductHeroContainer.fragment = gql`
  fragment ProductHeroContainer on PrdItem {
    id
    name
    description
    fullImage
  }
`;

type ProductHeroResponse = {
  id: string;
  name: string;
  description: string;
  fullImage: string;
};

type Props = SmartComponentProps<{
  productId: ProductRef;
  render: (props: ProductHeroContainerRenderProps) => JSX.Element;
}>;

type ProductHeroContainerRenderProps = {
  id: string;
  fullImage: string;
  name: string;
  description?: string;
};
