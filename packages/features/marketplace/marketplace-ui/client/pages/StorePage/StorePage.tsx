/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { StoreContainer, StoreProductsContainer } from '@exo/frontend-features-marketplace-logic';
import { StoreProductGrid } from '../../components/StoreProductGrid/StoreProductGrid';
import { StoreFilters } from '../../components/StoreFilters/StoreFilters';
import { StoreHeader } from '../../components/StoreHeader/StoreHeader';
import { ProductSortBy } from '../../components/ProductSortBy/ProductSortBy';

export const StorePage = ({ id }) => {
  const [sort, setSort] = useState<string>();
  const [facets, setFacets] = useState<string[]>([]);

  return (
    <StoreContainer
      id={id}
      render={({ store }) => (
        <>
          <StoreHeader store={store} />
          <Grid>
            <Row>
              <Column>
                <LayoutSpacing size="xs" />
                <Breadcrumb
                  path={[
                    { url: '/marketplace/stores', label: 'Stores' },
                    {
                      url: `/marketplace/store/${store?.id}`,
                      label: store?.name ?? 'Store'
                    }
                  ]}
                />
              </Column>
            </Row>
            <Row>
              <Column>
                <LayoutSpacing size="xs" />
              </Column>
            </Row>
            <Row>
              <Column>
                <LayoutSpacing size="xs" />
              </Column>
            </Row>
            <StoreProductsContainer
              id={id}
              render={({ products, filters }) => (
                <Row>
                  <Column lg={4}>
                    <StoreFilters
                      facets={filters}
                      selectedFacets={facets}
                      currency="USD"
                      onToggleFacet={(f: string) =>
                        setFacets(
                          !facets.includes(f) ? [...facets, f] : facets?.filter(a => a !== f)
                        )
                      }
                      onReplaceFacets={(f: string[]) => setFacets(f)}
                      onRemoveFacet={(f: string) => setFacets(facets?.filter(a => a !== f))}
                    />
                  </Column>
                  <Column lg={8}>
                    <Row>
                      <Column>
                        <ProductSortBy sort={sort} onChange={setSort} />
                      </Column>
                    </Row>
                    <LayoutSpacing size="xs" />
                    <StoreProductGrid products={products} />
                    <LayoutSpacing size="sm" />
                  </Column>
                </Row>
              )}
            />
          </Grid>
        </>
      )}
    />
  );
};
