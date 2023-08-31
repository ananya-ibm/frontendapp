/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import { Route } from 'react-router-dom';

import React from 'react';
import last from 'lodash/last';
import { AppShellSwitch } from '@exo/frontend-common-app-shell';
import { PageNotFound } from '@exo/frontend-features-chrome-ui';
import {
  ProductRef,
  CategoryRef,
  makeProductUrlFactory,
  SkuRedirectContainer
} from '@exo/frontend-features-catalog-logic';
import { CategoryPage } from './pages/CategoryPage/CategoryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { SearchPage } from './pages/SearchPage/SearchPage';
import { getCatalogConfig } from './catalogConfig';
import { ProductHeroPage } from './pages/ProductHeroPage/ProductHeroPage';

const urlParserFactory = (
  useSlugs: boolean,
  useSlugSeparator: boolean,
  slugSeparator?: string
): {
  categoryPath: (p: string) => CategoryRef[];
  skuId: (p: string, s: string) => ProductRef | undefined;
  productId: (p: string) => ProductRef;
} => {
  if (useSlugs) {
    return {
      categoryPath: p => p.split('/').map(e => new CategoryRef({ slug: e })),
      skuId: (p, s) =>
        s === '_'
          ? undefined
          : new ProductRef({
              slug: useSlugSeparator ? `${s}${slugSeparator}${p}` : s
            }),
      productId: p => new ProductRef({ slug: p })
    };
  } else {
    return {
      categoryPath: p => p.split('/').map(e => new CategoryRef({ id: last(e.split('_')) })),
      skuId: (_, s) => (s === '_' ? undefined : new ProductRef({ partnumber: s })),
      productId: p => new ProductRef({ partnumber: p })
    };
  }
};

const extractSelectedFilters = (search: string) => {
  const baseSearch = new URLSearchParams(search);
  const selectFiltersQueryString = baseSearch.get('selectedFilters');
  return selectFiltersQueryString || {};
};

export const Routes = ({ config }) => {
  const catalogConfig = getCatalogConfig(config);

  const productUrlFactory = makeProductUrlFactory(
    !!catalogConfig.useSlugs,
    catalogConfig.useSlugseparator ? catalogConfig.slugSeparator! : undefined
  );

  const urlParser = urlParserFactory(
    !!catalogConfig.useSlugs,
    !!catalogConfig.useSlugseparator,
    catalogConfig.slugSeparator
  );

  return (
    <AppShellSwitch prefix="/catalog" missing={PageNotFound}>
      <Route
        path="/catalog/category/:categoryPath*"
        render={({ match, staticContext, location }) => {
          let params;
          if (staticContext) {
            params = staticContext;
          } else {
            params = location?.search
              ? { query: { selectedFilters: extractSelectedFilters(location?.search) } }
              : {};
          }
          return (
            <CategoryPage
              catalogConfig={catalogConfig}
              categoryId={last(urlParser.categoryPath((match.params as any).categoryPath))!}
              categoryPath={urlParser.categoryPath((match.params as any).categoryPath)}
              params={params.query}
            />
          );
        }}
      />
      <Route
        path="/catalog/products/:productId/:skuId"
        render={({ match }) =>
          catalogConfig.pdp?.template === 'hero' ? (
            <ProductHeroPage
              catalogConfig={catalogConfig}
              productId={urlParser.productId(match.params.productId!)}
              skuId={urlParser.skuId(match.params.productId, match.params.skuId)}
            />
          ) : (
            <ProductDetailsPage
              catalogConfig={catalogConfig}
              productId={urlParser.productId(match.params.productId)}
              skuId={urlParser.skuId(match.params.productId, match.params.skuId)}
            />
          )
        }
      />
      <Route
        path="/catalog/products/:productId"
        render={({ match, history }) => (
          <SkuRedirectContainer
            productId={urlParser.productId(match.params.productId)}
            onRedirect={({ product, sku }) => {
              history.replace(productUrlFactory(product, sku ?? { id: '_', slug: '_' }));
            }}
            render={() => <div />}
          />
        )}
      />
      <Route
        path="/catalog/search/:term?"
        render={({ match }) => (
          <SearchPage catalogConfig={catalogConfig} term={match.params.term!} />
        )}
      />
    </AppShellSwitch>
  );
};
