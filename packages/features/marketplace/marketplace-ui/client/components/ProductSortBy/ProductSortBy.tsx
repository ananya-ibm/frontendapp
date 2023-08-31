/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Dropdown } from '@exo/frontend-components-base';
import React from 'react';
import * as S from './ProductSortBy.styles';

type SortOption = {
  id: string;
  text: string;
};

const sortOptions: SortOption[] = [
  { id: 'RELEVANCE', text: 'Relevance' },
  { id: 'PRICE_ASCENDING', text: 'Price (Low to High)' },
  { id: 'PRICE_DESCENDING', text: 'Price (High to Low)' },
  { id: 'NAME', text: 'Name' }
];

export const ProductSortBy = ({ sort, onChange }) => {
  return (
    <S.ProductSortBy>
      <Dropdown<SortOption>
        id="Sort By"
        variant="inline"
        key="Sort By"
        items={sortOptions}
        itemToString={item => (item ? item.text : '')}
        dropdownLabel="Choose option"
        selectedItem={sortOptions.find(so => so.id === sort) ?? sortOptions[0]}
        labelText="Sort by: "
        onChange={a => onChange(a.id)}
      />
    </S.ProductSortBy>
  );
};
