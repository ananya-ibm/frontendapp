/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  Breadcrumb,
  Button,
  Card,
  CardFooter,
  CardSection,
  CardTitle,
  Column,
  Grid,
  Row
} from '@exo/frontend-components-base';
import { LayoutSpacing } from '@exo/frontend-components-core';
import React from 'react';
import { StoreFinderContainer } from '@exo/frontend-features-store-logic';
import { useLocales } from '@exo/frontend-common-i18n';
import { Dropdown } from '@exo/frontend-components-forms';
import { useSessionContext } from '@exo/frontend-common-session-context';
import * as S from './StoreFinder.styles';

export const StoreFinder = () => {
  const { loading, data } = useLocales();
  const session = useSessionContext();

  return (
    <>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <Breadcrumb path={[{ url: '/store-finder/store-finder', label: 'Store Finder' }]} />
          </Column>
        </Row>

        <Row>
          <Column>
            <h1>Store Finder</h1>
          </Column>
        </Row>
        <StoreFinderContainer
          onChange={(id, name, country) => {
            session.set({ storeId: id, storeName: name, country });
          }}
          render={({
            stores,
            selectedStoreId,
            onChange,
            onSelectCountry,
            onSelectLocation,
            country
          }) => {
            return (
              <>
                <Row>
                  <Column>
                    <S.Selector>
                      {!loading && (
                        <Dropdown
                          labelText=""
                          isRequired
                          value={country}
                          onChangeValue={c => {
                            onSelectCountry(c);
                          }}
                          items={data.map(c => ({ name: c.name, value: c.isoCode }))}
                        />
                      )}

                      <Button
                        size="field"
                        label="Use my location"
                        onClick={() => {
                          navigator.geolocation.getCurrentPosition(a => {
                            onSelectLocation(
                              a.coords.longitude.toString(),
                              a.coords.latitude.toString()
                            );
                          });
                        }}
                      />
                    </S.Selector>
                  </Column>
                </Row>

                <LayoutSpacing size="sm" />

                <Row>
                  <Column>
                    <S.Cards>
                      {stores.map(s => (
                        <Card interactive>
                          <CardTitle>
                            {s.name}
                            {selectedStoreId === s.id ? ' [SELECTED]' : ''}
                          </CardTitle>
                          <CardSection>
                            <div>{s.address}</div>
                            <div>{s.city}</div>
                          </CardSection>
                          <CardFooter
                            primaryActions={[
                              {
                                label: 'Select',
                                onClick: () => {
                                  onChange(s.id, s.name);
                                }
                              }
                            ]}
                          />
                        </Card>
                      ))}
                    </S.Cards>
                  </Column>
                </Row>
              </>
            );
          }}
        />

        <LayoutSpacing size="xl" />
      </Grid>
    </>
  );
};
