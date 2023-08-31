/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import { SidePanel } from '@exo/frontend-components-core';
import React from 'react';
import { AvailableFilters } from './AvailableFilters';
import * as S from './FiltersPanel.styles';
import { SelectedFilters } from './SelectedFilters';

export const FiltersPanel = ({ selectedFacets, facets, facetState, onClose }) => {
  return (
    <>
      <SidePanel.Body>
        <S.BodyInner>
          {selectedFacets?.length > 0 && (
            <>
              <S.SelectedFilters>
                <SelectedFilters
                  selected={selectedFacets}
                  removeFacet={facetState.ops.removeFacet}
                />
              </S.SelectedFilters>

              <S.LinkButton>
                <Button
                  variant="link"
                  onClick={() => facetState.ops.replaceFacets([])}
                  label="Clear all filters"
                />
              </S.LinkButton>
            </>
          )}

          <S.Filters>
            <AvailableFilters
              facets={facets}
              toggleFacet={facetState.ops.toggleFacet}
              selected={selectedFacets}
              setAllFacets={facetState.ops.replaceFacets}
            />
          </S.Filters>
        </S.BodyInner>
      </SidePanel.Body>
      <SidePanel.Footer>
        <S.Buttons isCompact>
          <Button
            label="Apply"
            onClick={() => {
              facetState.ops.commit();
              onClose();
            }}
          />
          <Button
            variant="secondary"
            label="Cancel"
            onClick={() => {
              facetState.ops.abort();
              onClose();
            }}
          />
        </S.Buttons>
      </SidePanel.Footer>
    </>
  );
};

FiltersPanel.Skeleton = () => (
  <>
    <SidePanel.Body>
      <S.BodyInner>Loading...</S.BodyInner>
    </SidePanel.Body>
    <SidePanel.Footer>
      <S.Buttons isCompact>
        <Button label="Apply" disabled />
        <Button variant="secondary" label="Cancel" disabled />
      </S.Buttons>
    </SidePanel.Footer>
  </>
);
