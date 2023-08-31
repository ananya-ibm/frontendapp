/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback, useState } from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Filters, FiltersSection, LayoutSpacing, SelectedFilters } from '@exo/frontend-components-core';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { useHistory } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import {
  useFacetState,
  SearchFiltersContainer,
  SearchListingContainer
} from '@exo/frontend-features-catalog-logic';
import { ExtensionNode } from '@exo/frontend-common-app-shell';
import { ProductView } from '../../components/ProductView/ProductView';
import { CatalogConfig } from '../../catalogConfig';

export const SearchPage = ({ catalogConfig, term }: Props) => {
  const intl = useIntl('features.catalog.catalog-ui.pages.SearchPage');
  const facetState = useFacetState({ key: term, baseFacets: catalogConfig.baseFacets });
  const sessionContext = useSessionContext();
  const history = useHistory();
  const [showFilter, setShowFilter] = useState(false);

  const onSearch = useCallback(
    (t) => {
      history.push(`/catalog/search/${t}`);
    },
    [history]
  );

  const currency = sessionContext.currency ?? catalogConfig.defaultCurrency;

  return (
    <>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <Breadcrumb
              path={[{ url: '/catalog/search', label: intl.msg('label.search', 'Search') }]}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <h1>{intl.msg('label.search', 'Search')}</h1>
          </Column>
        </Row>

        <CmsContainer name="search">
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
                <SearchFiltersContainer
                  term={term}
                  currency={currency!}
                  selectedFacets={facetState?.state?.selectedFacets}
                  onLoad={({ selectedFacets }) =>
                    facetState?.ops?.setSelectedFacetDescriptions(
                      selectedFacets.map((s) => ({
                        id: s.code,
                        label: `${s.facet.name} : ${s.label}`
                      }))
                    )
                  }
                  render={(args) => (
                    <>
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
                      <ExtensionNode
                        extensions={catalogConfig.search?.extensions?.form}
                        props={{
                          ...args,
                          onSearch,
                          onSort: facetState.ops.setSort,
                          onReplaceFacets: facetState.ops.replaceFacets,
                          appId: catalogConfig.speechly?.appID,
                          appLang: catalogConfig.speechly?.appLang
                        }}
                      />
                    </>
                  )}
                  renderLoading={() => <Filters.Skeleton />}
                />
              </FiltersSection>
            </Column>

            <Column lg={'75%'}>
              <SearchListingContainer
                term={term}
                sort={facetState.state?.sort}
                selectedFacets={[
                  ...facetState.state?.baseFacets,
                  ...(facetState.state?.selectedFacets ?? [])
                ]}
                storeId={sessionContext?.storeId}
                currency={currency ?? 'USD'}
                useAvailability={catalogConfig.plp?.availability}
                useReviews={catalogConfig.plp?.reviews}
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
        </CmsContainer>
      </Grid>
    </>
  );
};

type Props = {
  term: string;
  catalogConfig: CatalogConfig;
};
