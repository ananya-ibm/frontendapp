/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AvailableFilters, SelectedFacetForPresentation, FacetForPresentation  } from './AvailableFilters';
import * as S from './Filters.styles';

export const Filters = ({
  selectedFacets = [],
  facets,
  onToggleFacet,
  onReplaceFacets
}: Props) => {
//  const intl = useIntl('features.catalog.catalog-ui.components.Filters');
  return (
    <>
      <S.Filters>
        <AvailableFilters
          facets={facets}
          toggleFacet={onToggleFacet}
          selected={selectedFacets}
          setAllFacets={onReplaceFacets}
        />
      </S.Filters>
    </>
  );
};

type Props = {
  selectedFacets?: SelectedFacetForPresentation[];
  facets: FacetForPresentation[];
  onToggleFacet: (facet: string) => void;
  onReplaceFacets: (facet: string[]) => void;
};

Filters.Skeleton = () => {
  return (
    <S.Filters>
      <AvailableFilters.Skeleton />
    </S.Filters>
  );
};
