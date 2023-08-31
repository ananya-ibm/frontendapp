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
import { ReactElement } from 'react';
import { CategoryUrlFactory } from '../../catalogUrls';
import { useCategoryPath } from '../../hooks/useCategoryPath';
import { CategoryRef } from '../../model/category-ref';

export const CategoryBreadcrumbContainer = ({
  categoryId,
  categoryUrlFactory,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, error, data } = useCategoryPath({ categoryId });

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const path =
    data?.map((d, idx) => ({
      label: d.name,
      url: categoryUrlFactory(data.slice(0, idx + 1))
    })) ?? [];

  return render({ path });
};

export type CategoryBreadcrumbContainerRenderProps = {
  path: { label: string; url: string }[];
};

type Props = SmartComponentProps<{
  categoryId?: CategoryRef;
  categoryUrlFactory: CategoryUrlFactory;
  render: (args: CategoryBreadcrumbContainerRenderProps) => ReactElement | null;
}>;
