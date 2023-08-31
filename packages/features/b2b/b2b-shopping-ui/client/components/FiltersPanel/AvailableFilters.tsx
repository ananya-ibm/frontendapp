/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { SkeletonLine, Expander } from '@exo/frontend-components-core';
import { evaluateBreakpoint } from '@exo/frontend-common-style-utils';
import { useTheme } from 'styled-components';
import {
  FacetForPresentation,
  SelectedFacetForPresentation
} from '@exo/frontend-features-catalog-logic';
import { Checkbox, RadioButton } from '@exo/frontend-components-base';
import * as S from './AvailableFilters.styles';

const isItemSelected = (item: Item, selected: SelectedFacetForPresentation[]) => {
  return !!selected.find(s => s.code === item.code);
};

const getLabelText = (item: Item) => `${item.label} (${item.count})`;

const MultiSelectFacets = ({
  facet,
  toggleFacet,
  selected
}: {
  facet: FacetForPresentation;
  toggleFacet: (facet: string) => void;
  selected: SelectedFacetForPresentation[];
}) => {
  return (
    <>
      {facet.entries.map(item => (
        <S.CheckboxEntry key={`ce_${item.code}`}>
          <Checkbox
            id={item.code}
            name="filter-checkbox"
            className="filter-checkbox"
            key={`checkbox-${facet.name} ${item.label} (${item.count})`}
            labelText={getLabelText(item)}
            onChange={() => toggleFacet(item.code)}
            checked={selected.length > 0 && isItemSelected(item, selected)}
          />
        </S.CheckboxEntry>
      ))}
    </>
  );
};

const SingleSelectFacets = ({
  facet,
  setAllFacets,
  selected
}: {
  facet: FacetForPresentation;
  setAllFacets: (facets: string[]) => void;
  selected: SelectedFacetForPresentation[];
}) => {
  return (
    <>
      {facet.entries.map(item => (
        <S.SingleSelect key={`radio-${facet.name} ${item.label} (${item.count})`}>
          <RadioButton
            id={item.code}
            labelText={getLabelText(item)}
            name={facet.name}
            onChange={() => {
              // remove radio button belonging to same facet
              const keepFacets = selected.filter(f => f.facet.name !== facet.name);
              setAllFacets([...keepFacets?.map(k => k.code), item.code]);
            }}
            disabled={false} // shouldnt disable radio buttons, user should be able to change selection
            checked={selected.length > 0 && isItemSelected(item, selected)}
          />
        </S.SingleSelect>
      ))}
    </>
  );
};

export const AvailableFilters = ({ facets, toggleFacet, selected, setAllFacets }: Props) => {
  return (
    <>
      {facets?.map(facet => (
        <S.Facet key={`facet-${facet.name}}`}>
          <h6>{facet.name}</h6>
          {facet.multiSelect ? (
            <MultiSelectFacets facet={facet} toggleFacet={toggleFacet} selected={selected} />
          ) : (
            <SingleSelectFacets facet={facet} setAllFacets={setAllFacets} selected={selected} />
          )}
        </S.Facet>
      ))}
    </>
  );
};

type Props = {
  toggleFacet: (facet: string) => void;
  setAllFacets: (facet: string[]) => void;
  selected: SelectedFacetForPresentation[];
  facets: FacetForPresentation[];
};

type Item = {
  label: string;
  code: string;
  count?: number;
};

AvailableFilters.Skeleton = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useTheme();
  return (
    <S.Facet>
      <Expander
        label={<SkeletonLine />}
        isDefaultExpanded={!evaluateBreakpoint('lessThan', 'large', theme)}
      >
        {[0, 1, 2].map(s => (
          <S.CheckboxEntry key={`sk_${s}`}>
            <Checkbox
              id={s.toString()}
              name="filter-checkbox"
              className="filter-checkbox"
              labelText={<SkeletonLine />}
            />
          </S.CheckboxEntry>
        ))}
      </Expander>
    </S.Facet>
  );
};
