/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Address } from '@exo/frontend-features-checkout-logic';
import * as S from './AddressBookSelector.styles';
import { SelectionList } from '@exo/frontend-components-core';

export const AddressBookSelector = ({
  addresses,
  hasNew,
  selectedAddress,
  newAddress,
  onAddressSelect = () => {}
}: Props) => {
  return (
    <SelectionList>
      {addresses?.map(a => (
        <SelectionList.Entry
          key={a.id}
          onClick={() => onAddressSelect(a)}
          defaultSelected={selectedAddress.id === a.id}
        >
          <S.Name>{a.firstName} {a.lastName}</S.Name>
          <S.Description>{a.address1}, {a.zip} {a.city}</S.Description>
        </SelectionList.Entry>
      ))}

      {hasNew && (
        <SelectionList.Entry
          onClick={() => onAddressSelect(newAddress)}
          defaultSelected={!addresses.find(a => a.id === selectedAddress.id)}
        >
          <S.Name>Add new address</S.Name>
        </SelectionList.Entry>
      )}
    </SelectionList>
  );
};

AddressBookSelector.Skeleton = () => {
  return <SelectionList.Skeleton />
};

type Props = {
  addresses: Address[];
  hasNew: boolean;
  selectedAddress: Address;
  newAddress: Address;
  onAddressSelect: (addr: Address) => void;
};
