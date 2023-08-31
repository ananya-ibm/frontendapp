/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { evaluateBreakpoint } from '@exo/frontend-common-style-utils';
import { useCartModification } from '@exo/frontend-features-cart-logic';
import {
  SearchFiltersContainer,
  SearchListingContainer,
  useFacetState
} from '@exo/frontend-features-catalog-logic';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { B2BProductsGrid } from '../../components/B2BProductsGrid/B2BProductsGrid';
import { FiltersPanel } from '../../components/FiltersPanel/FIltersPanel';
import { PanelBreadcrumb } from '../../components/PanelBreadcrumb/PanelBreadcrumb';
import { PanelHeader } from '../../components/PanelHeader/PanelHeader';
import { UrlFactory } from '../../urls';

export const SearchProductListPanel = ({ query, onClickProduct }: Props) => {
  const theme = useTheme();
  const cartModification = useCartModification();
  const facetState = useFacetState({
    key: `query:${query}`,
    staged: true
  });

  const [isFilterShown, setIsFilterShown] = useState(false);

  return (
    <>
      <PanelHeader
        query={query}
        isFilterDisabled={false}
        onFilterClick={() => setIsFilterShown(true)}
        isFilterShown={isFilterShown}
        filterCount={facetState?.state?.selectedFacets?.length ?? 0}
      />

      <PanelBreadcrumb
        path={[
          {
            url: '#',
            label: `Search: ${query}`
          }
        ]}
      />

      {isFilterShown && (
        <SearchFiltersContainer
          term={query}
          currency="USD"
          selectedFacets={facetState?.state?.stagedFacets}
          render={({ selectedFacets, facets }) => (
            <FiltersPanel
              selectedFacets={selectedFacets}
              facets={facets}
              onClose={() => setIsFilterShown(false)}
              facetState={facetState}
            />
          )}
          renderLoading={() => <FiltersPanel.Skeleton />}
        />
      )}

      {!isFilterShown && (
        <SearchListingContainer
          term={query}
          selectedFacets={facetState.state?.selectedFacets ?? []}
          currency="USD"
          render={props => (
            <B2BProductsGrid
              {...props}
              onCartAdd={(prdId, qty) => {
                cartModification.add([{ id: prdId, quantity: qty }]);
                if (!evaluateBreakpoint('greaterThan', 'large', theme)) {
                  // TODO: Close
                }
              }}
              onClick={onClickProduct}
            />
          )}
          renderLoading={() => <B2BProductsGrid.Skeleton />}
        />
      )}
    </>
  );
};

type Props = {
  query: string;
  onClickProduct: (string) => void;
  urlFactory: UrlFactory;
};
