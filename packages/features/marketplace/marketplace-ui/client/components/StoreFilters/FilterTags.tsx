/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Row, Column, Tag } from '@exo/frontend-components-base';
import { formatMoney } from '@exo/frontend-common-i18n';
import * as S from './StoreFilters.styles';

const getLabelText = (f, code, currency) =>
  f.name.toLowerCase().includes('price')
    ? `${f.label} : ${formatMoney(f.entries.find(e => e.code === code).label, currency)}`
    : `${f.label} : ${f.entries.find(e => e.code === code).label}`;

const getFacetTags = (selected, removeFacet, facets, currency) => (
  <S.Tags>
    {selected.map(code => {
      const f = facets.find(facet => facet.entries.map(entry => entry.code.includes(code)));

      if (!f) return null;

      return (
        <Tag
          onClick={() => removeFacet(code)}
          key={f.label}
          label={getLabelText(f, code, currency)}
        />
      );
    })}
  </S.Tags>
);

const FilterTags = ({ selected, removeFacet, facets, currency }) => {
  const Tags = getFacetTags(selected, removeFacet, facets, currency);
  return (
    <Row>
      <Column>{Tags}</Column>
    </Row>
  );
};

export default FilterTags;
