/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading, no-else-return, react/forbid-prop-types */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Filters, FiltersSection, LayoutSpacing, SelectedFilters, SkeletonLine } from '@exo/frontend-components-core';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import {
  makeCategoryUrlFactory,
  useFacetState,
  CategoryBreadcrumbContainer,
  CategoryListingContainer,
  CategoryFiltersContainer,
  CategoryNavigationContainer,
  CategoryRef,
  CategoryHeaderContainer
} from '@exo/frontend-features-catalog-logic';
import { ProductView } from '../../components/ProductView/ProductView';
import { CategoryNavigation } from '../../components/CategoryNavigation/CategoryNavigation';
import { CatalogConfig } from '../../catalogConfig';

export const CategoryPage = ({ catalogConfig, categoryId, categoryPath, params }: Props) => {
  const sessionContext = useSessionContext();
  const facetState = useFacetState({
    key: categoryId,
    baseFacets: catalogConfig.baseFacets,
    baseSort: catalogConfig.baseSort,
    baseSelectedFacets: params?.selectedFilters ? [params.selectedFilters] : []
  });
  const [showFilter, setShowFilter] = useState(false);
  const { pathname } = useLocation();

  const categoryUrlFactory = makeCategoryUrlFactory(!!catalogConfig?.useSlugs);

  const currency = sessionContext.currency ?? catalogConfig.defaultCurrency;
  console.assert(currency);

  return (
    <>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <CategoryBreadcrumbContainer
              categoryId={categoryId}
              categoryUrlFactory={categoryUrlFactory}
              render={(args) => <Breadcrumb {...args} />}
              renderLoading={() => <Breadcrumb.Skeleton />}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <CategoryHeaderContainer
              categoryId={categoryId}
              render={({ name, description }) => (
                <>
                  <h1 style={{ marginBottom: '0.5rem' }}>{name}</h1>
                  {description && description !== name && <p>{description}</p>}
                </>
              )} 
              renderLoading={() => <h1><SkeletonLine /></h1>}
            />
          </Column>
        </Row>

        <CmsContainer name="cat">
          <Row>
            <Column>
              <LayoutSpacing size="xs" />
            </Column>
          </Row>

          <CmsSpot
            name="hero"
            render={(content) => (
              <Row>
                <Column>
                  {content}
                  <LayoutSpacing size="sm" />
                </Column>
              </Row>
            )}
          />

          <Row>
            <Column lg={'25%'} xl={4}>
              <FiltersSection
                isFilterVisible={showFilter}
                onHideFilter={() => setShowFilter(false)}
                selectedFilters={
                  <SelectedFilters
                    selected={facetState?.state?.selectedFacetDescriptions ?? []}
                    removeFacet={facetState?.ops?.removeFacet}
                  />
                }
              >
                <CategoryNavigationContainer
                  categoryPath={categoryPath}
                  render={(args) => (
                    <CategoryNavigation
                      {...args}
                      onChange={() => setShowFilter(false)}
                      categoryUrlFactory={categoryUrlFactory}
                      pathname={pathname}
                    />
                  )}
                  renderLoading={() => <CategoryNavigation.Skeleton />}
                />

                <CategoryFiltersContainer
                  categoryId={categoryId}
                  currency={currency!}
                  selectedFacets={facetState?.state?.selectedFacets}
                  hasPriceFilters={catalogConfig.filters?.includesPrice}
                  onLoad={({ selectedFacets }) =>
                    facetState?.ops?.setSelectedFacetDescriptions(
                      selectedFacets.map((s) => ({
                        id: s.code,
                        label: `${s.facet.name} : ${s.label}`
                      }))
                    )
                  }
                  render={(args) => (
                    <Filters
                      {...args}
                      onToggleFacet={(f: string) => {
                        facetState.ops.toggleFacet(f);
                        setShowFilter(false);
                      }}
                      onReplaceFacets={(f: string[]) => {
                        facetState.ops.replaceFacets(f);
                        setShowFilter(false);
                      }}
                    />
                  )}
                  renderLoading={() => <Filters.Skeleton />}
                />
              </FiltersSection>
            </Column>
            <Column lg={'75%'}>
              <CategoryListingContainer
                categoryId={categoryId}
                currency={currency!}
                sort={facetState.state?.sort}
                selectedFacets={[
                  ...facetState.state?.baseFacets,
                  ...(facetState.state?.selectedFacets ?? [])
                ]}
                storeId={sessionContext?.storeId}
                useAvailability={catalogConfig?.plp?.availability}
                useReviews={catalogConfig?.plp?.reviews}
                render={(args) => (
                  <ProductView
                    mode={facetState.state?.displayMode}
                    onToggleFilters={() => setShowFilter(!showFilter)}
                    sort={facetState?.state?.sort}
                    onSort={(s) => facetState?.ops?.setSort(s)}
                    {...args}
                  />
                )}
              />
              <LayoutSpacing size="sm" />
            </Column>
          </Row>
          <CmsSpot
            name="footer"
            render={(content) => (
              <Row>
                <Column>{content}</Column>
              </Row>
            )}
          />
        </CmsContainer>
        <LayoutSpacing size="xl" />
      </Grid>
    </>
  );
};

type Props = {
  categoryId: CategoryRef;
  categoryPath: CategoryRef[];
  catalogConfig: CatalogConfig;
  params?: {
    selectedFilters?: string;
  };
};
