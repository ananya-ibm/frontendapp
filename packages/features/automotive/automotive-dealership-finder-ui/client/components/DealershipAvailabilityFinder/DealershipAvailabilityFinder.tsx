/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Modal, Button, Dropdown, TextInput } from '@exo/frontend-components-base';
import { DealershipAvailabilityFinderContainerRenderProps } from '@exo/frontend-features-automotive-dealership-finder-logic';
import * as S from './DealershipAvaliabilityFinder.styles';

export const DealershipAvailabilityFinder = ({
  availability,
  onChange,
  onSearch,
  countries = [],
  selectedCountry,
  selectedStore,
  isOpen,
  onClose
}: DealershipAvailabilityFinderContainerRenderProps & {
  isOpen?: boolean;
  onClose: (b: boolean) => void;
}) => {
  const [search, setSearch] = useState('');
  const [store, setStore] = useState(selectedStore);
  const [country, setCountry] = useState(selectedCountry);

  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Find dealership..."
        onClose={() => {
          if (store && country) {
            onChange(store!.id!, store!.name!);
          }
          onClose(false);
        }}
        buttons={[
          {
            label: 'Book Test Drive',
            onClick: () => {
              onChange(store?.id!, store?.name!);
              onClose(false);
            },
            disabled: !store?.id
          }
        ]}
      >
        {countries.length > 1 && (
          <Dropdown
            labelText="Countries"
            dropdownLabel="Country"
            id="country"
            selectedItem={countries.find(c => c.code === country)}
            initialSelectedItem={countries.find(c => c.code === country)}
            items={countries}
            itemToString={item => (item ? item.label : '')}
            onChange={e => {
              setCountry(e!.code);
              onSearch({ country: e!.code, term: '' });
            }}
          />
        )}

        {country && (
          <>
            <S.Input>
              <TextInput
                id="zip"
                labelText="Zip code"
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
            </S.Input>

            <div style={{ height: '400px', overflowY: 'auto' }}>
              {availability?.[0]?.availability
                .filter(a => a.shipNode)
                .map(a => (
                  <S.Entry key={a.shipNode.id}>
                    <S.Radio>
                      <input
                        name="store"
                        value={a.shipNode.id}
                        type="radio"
                        onClick={e => {
                          setStore({
                            /* @ts-ignore */
                            id: e.target.value,
                            name: a.shipNode.name
                          });
                        }}
                        defaultChecked={a.shipNode.id === selectedStore?.id}
                        disabled={a.status === 'outOfStock'}
                      />
                    </S.Radio>
                    <S.Status type={a.status === 'inStock' ? 'available' : 'not_available'}>
                      {a.status === 'inStock' ? 'In stock' : 'Out of stock'}
                    </S.Status>
                    {a.shipNode.name}
                    <S.Distance as="div">{a.shipNode.distance || 'Unknown distance'}</S.Distance>
                  </S.Entry>
                ))}
              {!availability && selectedStore?.id && (
                <S.Entry key={selectedStore.id}>
                  <S.Radio>
                    <input name="store" value={selectedStore.id} type="radio" />
                  </S.Radio>
                  <S.Status type="available">In Stock</S.Status>
                  {selectedStore.name}
                  <S.Distance as="div">Unknown distance</S.Distance>
                </S.Entry>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
