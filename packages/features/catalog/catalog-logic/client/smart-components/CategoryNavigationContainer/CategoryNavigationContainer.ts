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
import { asCategoryRef, CategoryRef } from '../../model/category-ref';

const recurse = (
  c: CategoryNavigationContainerCategory,
  fn: (a: CategoryNavigationContainerCategory) => void
) => {
  fn(c);
  (c?.childCategories ?? []).forEach(ch => recurse(ch, fn));
};

export const CategoryNavigationContainer = ({
  categoryPath,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const level1CategoryId = asCategoryRef(categoryPath[0]);
  const categoryId = asCategoryRef(categoryPath[categoryPath.length - 1]);
  const { loading, error, data } = useCategory<CategoryNavigationContainerCategory>(
    { categoryId: level1CategoryId },
    CategoryNavigationContainer.fragment
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const categories: Record<string, CategoryNavigationContainerCategory> = {};
  recurse(data!, c => {
    categories[categoryId.isSlug ? c.slug! : c.id] = c;
  });

  return render({
    categoryTree: data!,
    childCategories: categories[categoryId.ref]?.childCategories ?? [],
    path: categoryPath.map(p => categories[categoryId.isSlug ? p.slug! : p.id!])
  });
};

// TODO: Do we need to export this t
export type CategoryNavigationContainerCategory = {
  id: string;
  identifier: string;
  name: string;
  slug?: string;
  thumbnail?: string;
  childCategories: CategoryNavigationContainerCategory[];
};

export type CategoryNavigationContainerRenderProps = {
  categoryTree: CategoryNavigationContainerCategory;
  childCategories: CategoryNavigationContainerCategory[];
  path: CategoryNavigationContainerCategory[];
};

type Props = SmartComponentProps<{
  categoryPath: CategoryRef[];
  render: (args: CategoryNavigationContainerRenderProps) => ReactElement | null;
}>;

CategoryNavigationContainer.fragment = gql`
  fragment Path on CatCategory {
    id
    identifier
    name
    slug
    thumbnail
    childCategories {
      id
      identifier
      name
      slug
      thumbnail
      childCategories {
        id
        identifier
        name
        slug
        thumbnail
      }
    }
  }
`;
