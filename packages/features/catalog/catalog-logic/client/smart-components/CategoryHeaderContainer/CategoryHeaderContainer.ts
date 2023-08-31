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
import { ReactElement } from 'react';
import { useCategory } from '../../hooks/useCategory';
import { CategoryRef } from '../../model/category-ref';

export const CategoryHeaderContainer = ({
  categoryId,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, error, data } = useCategory<{ name: string; description?: string }>({ categoryId }, CategoryHeaderContainer.fragment);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({ name: data!.name, description: data!.description });
};

export type CategoryHeaderContainerRenderProps = {
  name: string;
  description?: string;
};

type Props = SmartComponentProps<{
  categoryId: CategoryRef | string;
  render: (args: CategoryHeaderContainerRenderProps) => ReactElement | null;
}>;


CategoryHeaderContainer.fragment = gql`
  fragment CategoryHeader on CatCategory {
    id
    name
    description
  }
`;