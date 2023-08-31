/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/prop-types */

import React from 'react';
import {
  CategoryNavigationContainerCategory,
  CategoryNavigationContainerRenderProps,
  CategoryUrlFactory
} from '@exo/frontend-features-catalog-logic';
import { SkeletonLine } from '@exo/frontend-components-core';
import * as S from './CategoryNavigation.styles';

const CategoryLink = ({
  categoryUrlFactory,
  pathname,
  path,
  onClick
}: {
  categoryUrlFactory: CategoryUrlFactory;
  pathname: string;
  path: CategoryNavigationContainerCategory[];
  onClick: () => boolean;
}) => {
  const last = path[path.length - 1];
  const url = categoryUrlFactory(path);

  return (
    <S.Link isActive={pathname === url} to={url} onClick={onClick}>
      {last.name}
    </S.Link>
  );
};

const CategoryNavigation = ({ onChange, path, pathname, categoryUrlFactory, categoryTree }: Props) => {
  const root = categoryTree;

  if (!root.childCategories.length) return <span></span>;

  return (
    <>
      <S.Categories>
        <S.CategoriesLabel>Categories</S.CategoriesLabel>
        <S.Items>
        {root?.childCategories?.map(c => (
          <S.Item key={c.id}>
            <CategoryLink
              categoryUrlFactory={categoryUrlFactory}
              pathname={pathname}
              path={[root, c]}
              onClick={() => { onChange?.(); return true; }}
            />
            {path.length > 1 && path[1].id === c.id && (
              <ul className="subcats">
                {c.childCategories.map(c2 => (
                  <S.Item key={c2.id}>
                    <CategoryLink
                      categoryUrlFactory={categoryUrlFactory}
                      pathname={pathname}
                      path={[root, c, c2]}
                      onClick={() => { onChange?.(); return true; }}
                      />
                  </S.Item>
                ))}
              </ul>
            )}
          </S.Item>
        ))}
        </S.Items>
      </S.Categories>
    </>
  );
};

type Props = CategoryNavigationContainerRenderProps & {
  categoryUrlFactory: CategoryUrlFactory;
  pathname: string;
  onChange?: () => void;
};

CategoryNavigation.Skeleton = () => {
  return (
    <>
      <S.Categories>
        <S.CategoriesLabel>Categories</S.CategoriesLabel>
        <S.Items>
          {[0, 1, 2].map(s => (
            <S.Item key={`sk_${s}`}>
              <SkeletonLine />
            </S.Item>
          ))}
        </S.Items>
      </S.Categories>
    </>
  );
};

export { CategoryNavigation };
