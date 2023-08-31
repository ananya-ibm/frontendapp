/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import Filters from './Filters';
import FilterTags from './FilterTags';
import * as S from './StoreFilters.styles';

const hasSelection = f => f.entries.some(e => e.state === 'selected');

// TODO: Replace with proper translation support
const facetLabel = f => (f.name.startsWith('OfferPrice_') ? 'Price' : f.name);
const facetEntry = (f, e) =>
  f.name.startsWith('OfferPrice_')
    ? `${e.label.split('|')[1]} - ${e.label.split('|')[3].split(']')[0]}`
    : `${e.label}`;

const fixData = facets => {
  return facets
    .filter(f => f.name !== 'Category')
    .map(f => {
      return {
        ...f,
        state: hasSelection(f) ? 'selected' : 'unselected',
        label: facetLabel(f),
        name: facetLabel(f),
        entries: f.entries
          .filter(e => e.type === 'select')
          .map(e => ({
            ...e,
            label: facetEntry(f, e)
          }))
      };
    });
};

export const StoreFilters = ({
  selectedFacets,
  facets: iFacets,
  currency,
  onToggleFacet,
  onReplaceFacets,
  onRemoveFacet
}) => {
  const data = iFacets;

  const facets = data?.products?.facets;

  const contextFacets = selectedFacets;

  return data ? (
    <>
      {contextFacets?.length > 0 && facets && (
        <>
          <FilterTags
            selected={contextFacets}
            removeFacet={onRemoveFacet}
            facets={facets ? fixData(facets) : []}
            currency={currency}
          />
          <LayoutSpacing size="sm" />
          <Button variant="link" onClick={() => onReplaceFacets([])} label="Clear all filters" />
          <LayoutSpacing size="sm" />
        </>
      )}
      <S.Filters>
        <Filters
          facets={facets ? fixData(facets) : []}
          addFacet={onToggleFacet}
          selected={contextFacets}
          currency={currency}
        />
      </S.Filters>
    </>
  ) : null;
};
