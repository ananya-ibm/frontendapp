/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Expander } from '@exo/frontend-components-core';
import { Checkbox, RadioButton, Row } from '@exo/frontend-components-base';
import * as R from 'ramda';
import { formatMoney } from '@exo/frontend-common-i18n';
import * as S from './StoreFilters.styles';

const isItemSelected = item => R.includes(item.code);

const getLabelText = (facet, item, currency) =>
  R.includes('price', facet.name.toLowerCase())
    ? `${formatMoney(item.label, currency)} (${item.count})`
    : `${item.label} (${item.count})`;

const Filters = ({ facets, addFacet, selected, currency }) => {
  return (
    <>
      {facets?.map(facet =>
        facet.multiSelect ? (
          <S.Facet key={`facet-${facet.name}`}>
            <Expander label={facet.name} isDefaultExpanded>
              {facet.entries.map(item => (
                <Checkbox
                  id={item.code}
                  name="filter-checkbox"
                  className="filter-checkbox"
                  key={`checkbox-${facet.name} ${item.label} (${item.count})`}
                  labelText={getLabelText(facet, item, currency)}
                  onChange={() => addFacet(item.code)}
                  checked={selected.length > 0 && isItemSelected(item)(selected)}
                />
              ))}
            </Expander>
          </S.Facet>
        ) : (
          <S.Facet key={`facet-${facet.name}`}>
            <Expander label={facet.name} isDefaultExpanded>
              {facet.entries.map(item => (
                <Row key={`radio-${facet.name} ${item.label} (${item.count})`}>
                  <S.SingleSelect>
                    <RadioButton
                      id={item.code}
                      labelText={getLabelText(facet, item, currency)}
                      name="filter-radio-button"
                      onChange={() => addFacet(item.code)}
                      disabled={false}
                      checked={selected.length > 0 && isItemSelected(item)(selected)}
                    />
                  </S.SingleSelect>
                </Row>
              ))}
            </Expander>
          </S.Facet>
        )
      )}
    </>
  );
};

export default Filters;
