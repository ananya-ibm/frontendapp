/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { useState } from 'react';
import { Checkbox, RadioButton } from '@exo/frontend-components-base';
import * as S from './AvailableFilters.styles';
import { Add, Subtract } from '@carbon/react/icons';
import { SkeletonLine } from '../SkeletonLine/SkeletonLine';

export type SelectedFacetForPresentation = {
  code: string;
  label?: string;
  facet: {
    name: string;
  };
};

export type FacetForPresentation = {
  name: string;
  code?: string;
  type?: string;
  multiSelect?: boolean;
  entries: {
    code: string;
    name?: string;
    label: string;
    count?: number;
  }[];
};

const isItemSelected = (item: Item, selected: SelectedFacetForPresentation[]) => {
  return !!selected.find((s) => s.code === item.code);
};

const getLabelText = (item: Item) => `${item.label} (${item.count})`;

const MultiSelectFacets = ({
  name,
  entries,
  toggleFacet,
  selected
}: {
  name: string;
  entries: FacetForPresentation['entries'];
  toggleFacet: (facet: string) => void;
  selected: SelectedFacetForPresentation[];
}) => {
  return (
    <>
      {entries.map((item) => (
        <S.CheckboxEntry key={`ce_${item.code}`}>
          <Checkbox
            id={item.code}
            name="filter-checkbox"
            className="filter-checkbox"
            key={`checkbox-${name} ${item.label} (${item.count})`}
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
  name,
  entries,
  setAllFacets,
  selected
}: {
  name: string;
  entries: FacetForPresentation['entries'];
  setAllFacets: (facets: string[]) => void;
  selected: SelectedFacetForPresentation[];
}) => {
  return (
    <>
      {entries.map((item) => (
        <S.SingleSelect key={`radio-${name} ${item.label} (${item.count})`}>
          <RadioButton
            id={item.code}
            labelText={getLabelText(item)}
            name={name}
            onChange={() => {
              // remove radio button belonging to same facet
              const keepFacets = selected.filter((f) => f.facet.name !== name);
              setAllFacets([...keepFacets?.map((k) => k.code), item.code]);
            }}
            disabled={false} // shouldnt disable radio buttons, user should be able to change selection
            checked={selected.length > 0 && isItemSelected(item, selected)}
          />
        </S.SingleSelect>
      ))}
    </>
  );
};

const MINIMIZED_COUNT = 5;

export const FilterSection = ({
  facet,
  toggleFacet,
  selected,
  setAllFacets
}: { facet: FacetForPresentation } & Pick<Props, 'toggleFacet' | 'selected' | 'setAllFacets'>) => {
  const [state, setState] = useState<'minimized' | 'maximized'>('minimized');
  const entries = state === 'minimized' ? facet.entries.slice(0, MINIMIZED_COUNT) : facet.entries;
  const hasMore = facet.entries.length > MINIMIZED_COUNT;
  return (
    <S.Facet key={`facet-${facet.name}}`}>
      <S.FacetLabel>{facet.name}</S.FacetLabel>
      {facet.multiSelect ? (
        <MultiSelectFacets
          name={facet.name}
          entries={entries}
          toggleFacet={toggleFacet}
          selected={selected}
        />
      ) : (
        <SingleSelectFacets
          name={facet.name}
          entries={entries}
          setAllFacets={setAllFacets}
          selected={selected}
        />
      )}

      {hasMore && (
        <S.ToggleMore>
          {state === 'minimized' && (
            <S.Toggle onClick={() => setState('maximized')}>
              Show more <Add size="16" />
            </S.Toggle>
          )}
          {state === 'maximized' && (
            <S.Toggle onClick={() => setState('minimized')}>
              Show less <Subtract size="16" />
            </S.Toggle>
          )}
        </S.ToggleMore>
      )}
    </S.Facet>
  );
};

export const AvailableFilters = ({ facets, toggleFacet, selected, setAllFacets }: Props) => {
  return (
    <>
      {facets?.map((facet) => (
        <FilterSection
          key={facet.name}
          facet={facet}
          toggleFacet={toggleFacet}
          selected={selected}
          setAllFacets={setAllFacets}
        />
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
  return (
    <S.Facet>
      <S.FacetLabel>
        <SkeletonLine />
      </S.FacetLabel>
      {[0, 1, 2].map((s) => (
        <S.CheckboxEntry key={`sk_${s}`}>
          <Checkbox
            id={s.toString()}
            name="filter-checkbox"
            className="filter-checkbox"
            labelText={<SkeletonLine />}
          />
        </S.CheckboxEntry>
      ))}
    </S.Facet>
  );
};
