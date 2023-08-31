/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Modal, Button, Dropdown } from '@exo/frontend-components-base';
import { StoreFinderContainerRenderProps } from '@exo/frontend-features-store-logic';

// TODO: We should put this is a shared location
type Unpacked<T> = T extends (infer U)[] ? U : T;

type Country = Unpacked<StoreFinderContainerRenderProps['countries']>;
type Store = Unpacked<StoreFinderContainerRenderProps['stores']>;

export const StoreFinder = ({
  onChange,
  selectedStoreId,
  selectedStoreName,
  stores,
  onSelectCountry,
  countries,
  country,
  isOpen = false
}: StoreFinderContainerRenderProps & { isOpen?: boolean }) => {
  const [selectedStore, setSelectedStore] = useState<{ id?: string; name?: string }>({
    id: selectedStoreId,
    name: selectedStoreName
  });
  const [open, setOpen] = useState<boolean>(isOpen);

  return (
    <>
      <Button
        variant="tertiary"
        size="small"
        onClick={() => setOpen(true)}
        label={selectedStore ? 'Change store...' : 'Select store....'}
      />

      <Modal
        isOpen={open}
        title="Select store..."
        onClose={() => setOpen(false)}
        buttons={[
          {
            label: 'Select',
            onClick: () => {
              onChange(selectedStore.id!, selectedStore.name!);
              setOpen(false);
            }
          },
          { label: 'Cancel', onClick: () => setOpen(false) }
        ]}
        data-testid="cart-SelectStore-modal"
      >
        {countries.length > 1 && (
          <Dropdown<Country>
            labelText="countries"
            dropdownLabel="Country"
            id="country"
            selectedItem={countries.find(c => c.code === country)}
            initialSelectedItem={countries.find(c => c.code === country)}
            items={countries}
            itemToString={item => (item ? item.label : '')}
            onChange={(e: Country) => {
              onSelectCountry(e.code);
            }}
          />
        )}

        <Dropdown<Store>
          labelText="Stores"
          dropdownLabel="Store"
          id="stores"
          selectedItem={stores.find(s => s.id === selectedStore.id)}
          initialSelectedItem={stores.find(s => s.id === selectedStoreId)}
          items={stores}
          itemToString={item => (item ? item.name : '')}
          onChange={e => {
            setSelectedStore(e);
          }}
        />
      </Modal>
    </>
  );
};
