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

export const ProductImagesContainer = ({
  productId,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, data, error } = useProduct<ProductImagesResponse>(
    { productId },
    ProductImagesContainer.fragment
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const additionalImages =
    data?.product?.attachments
      ?.filter(a => a.type === 'image')
      .map(a => getClientImagePath(a.url, true, false)) ?? [];

  return render({
    fullImage: getClientImagePath(data?.product?.fullImage, true, false),
    additionalImages:
      additionalImages.length > 0
        ? additionalImages
        : [getClientImagePath(data?.product?.fullImage, true, false)]
  });
};

ProductImagesContainer.fragment = gql`
  fragment ProductImagesContainer on PrdItem {
    id
    fullImage
    attachments {
      type
      url
    }
  }
`;

type ProductImagesResponse = {
  id: string;
  fullImage?: string;
  attachments?: {
    type: string;
    url: string;
  }[];
};

type Props = SmartComponentProps<{
  productId: ProductRef;
  render: (props: ProductImagesContainerRenderProps) => JSX.Element;
}>;

export type ProductImagesContainerRenderProps = {
  fullImage: string;
  additionalImages: string[];
};
