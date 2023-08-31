/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dropdown } from '@exo/frontend-components-base';
import * as S from './SortByDropdown.styles';

export const SortByDropdown = ({
  id,
  label = 'Sort by',
  items = [
    { id: 'RELEVANCE', label: 'Relevance' },
    { id: 'NAME', label: 'Name' },
    { id: 'PRICE_ASCENDING', label: 'Price Ascending' },
    { id: 'PRICE_DESCENDING', label: 'Price Descending' }
  ],
  selectedItem,
  onChange
}: Props) => (
  <S.SortByDropdown>
    <S.Label>{label}</S.Label>
    <Dropdown
      id={id}
      labelText=""
      items={items}
      selectedItem={selectedItem}
      onChange={onChange}
      dropdownLabel="Sort by"
      className="dropdown"
    />
  </S.SortByDropdown>
);

type Props = {
  id: string;
  label?: string;
  items: {
    id: string;
    label: string;
  }[];
  selectedItem?: {
    id: string;
    label: string;
  };
  onChange: () => void;
};
