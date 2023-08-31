/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  CategoryBreadcrumbContainer,
  CategoryNavigationContainer,
  CategoryRef,
  TopCategoryNavigationContainer
} from '@exo/frontend-features-catalog-logic';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { B2BCategoriesGrid } from '../../components/B2BCategoriesGrid/B2BCategoriesGrid';
import { PanelBreadcrumb } from '../../components/PanelBreadcrumb/PanelBreadcrumb';
import { PanelHeader } from '../../components/PanelHeader/PanelHeader';
import { UrlFactory } from '../../urls';

const RedirectToProductListWrapper = (
  props: React.ComponentProps<typeof B2BCategoriesGrid> & {
    render: (p: React.ComponentProps<typeof B2BCategoriesGrid>) => any;
    urlFactory: UrlFactory;
  }
) => {
  const history = useHistory();

  useEffect(() => {
    if (props.childCategories.length === 0 && props.id) {
      history.replace(props.urlFactory.categoryWithProducts(props.id));
    }
  }, [props.childCategories, props.id]);

  if (props.childCategories.length === 0 && props.id) return <div />;

  return props.render(props);
};

export const CategoryPanel = ({ id, urlFactory }: { id?: string; urlFactory: UrlFactory }) => {
  return (
    <>
      <PanelHeader isFilterDisabled />

      <CategoryBreadcrumbContainer
        categoryUrlFactory={urlFactory.category}
        categoryId={id ? new CategoryRef({ id }) : undefined}
        render={props => <PanelBreadcrumb {...props} />}
        renderLoading={() => <PanelBreadcrumb path={[]} />}
      />

      {id && (
        <CategoryNavigationContainer
          categoryPath={[new CategoryRef({ id })]}
          render={props => (
            <RedirectToProductListWrapper
              {...props}
              id={id}
              urlFactory={urlFactory}
              render={p => <B2BCategoriesGrid {...p} />}
            />
          )}
          renderLoading={() => <B2BCategoriesGrid.Skeleton />}
        />
      )}

      {!id && (
        <TopCategoryNavigationContainer
          render={props => <B2BCategoriesGrid {...props} />}
          renderLoading={() => <B2BCategoriesGrid.Skeleton />}
        />
      )}
    </>
  );
};
