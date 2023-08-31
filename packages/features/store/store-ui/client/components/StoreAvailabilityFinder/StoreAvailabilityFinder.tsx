/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Modal, Button, RadioButton, Dropdown, TextInput } from '@exo/frontend-components-base';
import { StoreAvailabilityContainerRenderProps } from '@exo/frontend-features-store-logic';
import * as S from './StoreAvailabilityFinder.styles';

// TODO: We have this in a couple of places - let's at least put it in one file
const stockStatusMap = {
  Available: 'available',
  Future: 'future',
  inStock: 'available',
  Unavailable: 'not_available'
};

const StoreAvailabilityFinder = ({
  state,
  countries=[],
  selectedStore,
  selectedCountry,
  onSearch=() => {},
  onChange=() => {},
  availability,
  isInitiallyOpen
}: StoreAvailabilityContainerRenderProps) => {
  const [open, setOpen] = useState(isInitiallyOpen ?? false);
  const [search, setSearch] = useState('');
  const [store, setStore] = useState(selectedStore);
  const [country, setCountry] = useState(selectedCountry);

  const loading = state?.loading;
  const error = state?.error;

  return (
    <S.StoreAvailabilityFinder>
      <S.AvailabilityButton
        variant="tertiary"
        size="small"
        onClick={() => setOpen(true)}
        label={selectedStore ? 'Change store...' : 'Select store....'}
      />
      <Modal
        isOpen={open}
        title="Find store..."
        onClose={() => {
          if (store && country) {
            onChange({
              country,
              storeId: store.id,
              storeName: store.name,
              storeDistance: store.distance
            });
          }
          setOpen(false);
        }}
        buttons={[
          {
            label: 'Select',
            onClick: () => {
              onChange({
                country,
                storeId: store!.id,
                storeName: store!.name,
                storeDistance: store!.distance
              });
              setOpen(false);
            }
          },
          { label: 'Cancel', onClick: () => setOpen(false) }
        ]}
      >
        {countries?.length > 1 && (
          <Dropdown<any>
            labelText="Countries"
            dropdownLabel="Country"
            id="country"
            selectedItem={countries.find(c => c.code === country)}
            initialSelectedItem={countries.find(c => c.code === country)}
            items={countries}
            itemToString={item => (item ? item.label : '')}
            onChange={e => {
              setCountry(e.code);
              onSearch({ country: e.code });
            }}
          />
        )}

        {country && (
          <>
            <S.StoreInput>
              <TextInput
                id="search"
                labelText="Zip code"
                placeholder="Zip code"
                onChange={e => setSearch(e.currentTarget.value)}
              />
              <Button
                variant="secondary"
                size="field"
                onClick={() => {
                  onSearch({ term: search, country });
                }}
                label="Find"
              />
            </S.StoreInput>

            <div style={{ height: '400px', overflowY: 'auto' }}>
              {error && (
                <div>
                  <span>Error: {error.message}</span>
                </div>
              )}

              {!error && loading && <span>Loading...</span>}

              {!error &&
                !loading &&
                availability?.[0]?.availability
                  .filter(a => a.shipNode)
                  .map(a => (
                    <S.Entry key={a.shipNode.id}>
                      <S.StoreInfo>
                        <RadioButton
                          name="store"
                          id={`store_${a.shipNode.id}`}
                          value={a.shipNode.id}
                          onChange={e => {
                            setStore({
                              /* @ts-ignore */
                              id: e.target.value,
                              name: a.shipNode.name,
                              distance: a.shipNode.distance
                            });
                          }}
                          labelText={a.shipNode.name}
                          defaultChecked={a.shipNode.id === selectedStore?.id}
                        />
                        <S.Distance as="div">
                          {a.shipNode.distance || 'Unknown distance'}
                        </S.Distance>
                      </S.StoreInfo>

                      <S.Status type={stockStatusMap[a.status] ?? 'not_available'}>
                        {stockStatusMap[a.status] === 'available' && <>In stock</>}
                        {stockStatusMap[a.status] === 'not_available' && <>Out of stock</>}
                        {stockStatusMap[a.status] === 'future' && (
                          <>Available on {a.availableDate}</>
                        )}
                      </S.Status>
                    </S.Entry>
                  ))}

              {!loading && !availability && selectedStore?.id && (
                <S.Entry key={selectedStore.id}>
                  <S.StoreInfo>
                    <RadioButton
                      id={`store_${selectedStore.id}`}
                      name="store"
                      value={selectedStore.id}
                      labelText={selectedStore.name}
                      labelPosition="right"
                      defaultChecked
                      checked
                    />
                    <S.Distance as="div">{selectedStore.distance}</S.Distance>
                  </S.StoreInfo>
                </S.Entry>
              )}
            </div>
          </>
        )}
      </Modal>
    </S.StoreAvailabilityFinder>
  );
};


export { StoreAvailabilityFinder };
