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
import { useTopCategoryList } from '../../hooks/useTopCategoryList';
import { CategoryNavigationContainerCategory } from '../CategoryNavigationContainer/CategoryNavigationContainer';

export const TopCategoryNavigationContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, error, data } = useTopCategoryList<CategoryNavigationContainerCategory>(
    {},
    TopCategoryNavigationContainer.fragment
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    childCategories: data ?? [],
    path: []
  });
};

export type TopCategoryNavigationContainerRenderProps = {
  childCategories: CategoryNavigationContainerCategory[];
  path: CategoryNavigationContainerCategory[];
};

type Props = SmartComponentProps<{
  render: (args: TopCategoryNavigationContainerRenderProps) => ReactElement | null;
}>;

TopCategoryNavigationContainer.fragment = gql`
  fragment TopCategoryNavigationContainer_Path on CatCategory {
    id
    identifier
    name
    slug
    thumbnail
  }
`;
