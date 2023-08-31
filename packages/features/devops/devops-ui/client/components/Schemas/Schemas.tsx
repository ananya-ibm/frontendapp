/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Schemas.styles';
import { SchemasContainerRenderProps } from '@exo/frontend-features-devops-logic';
import { Grid, Column, Row, Tag } from '@exo/frontend-components-base';
import { Filters, FiltersSection, LayoutSpacing, SelectedFilters } from '@exo/frontend-components-core';
import { ArrowRight } from '@carbon/react/icons';


export const Schemas = ({
  data,
  facets,
  selectedFacets,
  onRemoveFacet,
  onReplaceFacets,
  onToggleFacet
}: Props) => {
  return (
    <>
      <Grid>
        <S.PageTitle>API Marketplace</S.PageTitle>
        <S.PageDescription>
          <p>Below you can find a list of schemas implemented within the EXO codebase.</p>
          <p>
            Select a schema below to view API documentation and see the adapters that have been
            implemented.
          </p>
        </S.PageDescription>
        <Row>
          <Column lg={'25%'} xl={4}>
            <FiltersSection
              isFilterVisible={false}
              onHideFilter={() => {}}
              selectedFilters={
                <SelectedFilters
                  selected={selectedFacets?.map((s) => ({
                    id: s.facet.code,
                    label: `${s.label}: ${s.facet.name}`
                  }))}
                  removeFacet={onRemoveFacet}
                />
              }
            >
              <Filters
                facets={facets}
                onReplaceFacets={onReplaceFacets}
                onToggleFacet={onToggleFacet}
                selectedFacets={selectedFacets}
              />
            </FiltersSection>
          </Column>
          <Column lg={'75%'}>
            <Row>
              {data?.map((entry) => (
                <Column sm={16} md={4} lg={4} xl={3} key={entry.id}>
                  <S.SchemaTile href={'/devops/api/' + entry.id.split('@exo/')[1]}>
                    <S.Description>{entry.description}</S.Description>
                    <S.Feature>
                      <Tag label={entry.feature} />
                    </S.Feature>
                    <S.Action>
                      <ArrowRight />
                    </S.Action>
                  </S.SchemaTile>
                </Column>
              ))}
            </Row>
            <LayoutSpacing size="sm" />
          </Column>
        </Row>
      </Grid>
    </>
  );
};

type Props = SchemasContainerRenderProps & {
  // TODO: Add any additional props
};
