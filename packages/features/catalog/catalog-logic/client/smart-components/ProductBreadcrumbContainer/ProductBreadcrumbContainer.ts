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
import { CategoryUrlFactory, ProductUrlFactory } from '../../catalogUrls';
import { useProductPath } from '../../hooks/useProductPath';
import { ProductRef } from '../../model/product-ref';

export const ProductBreadcrumbContainer = ({
  productId,
  categoryUrlFactory,
  productUrlFactory,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, data, error } = useProductPath({ productId });

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const path =
    data?.map((d, idx) => ({
      label: d.name,
      url: categoryUrlFactory(data.slice(0, idx + 1))
    })) ?? [];
  path[path.length - 1].url = productUrlFactory(data![data!.length - 1]);

  return render({ path: path.map(p => ({ label: p.label, url: p.url })) });
};

type Props = SmartComponentProps<{
  productId: ProductRef;
  categoryUrlFactory: CategoryUrlFactory;
  productUrlFactory: ProductUrlFactory;
  render: (props: ProductBreadcrumbContainerRenderProps) => JSX.Element;
}>;

type ProductBreadcrumbContainerRenderProps = {
  path: {
    label: string;
    url: string;
  }[];
};
