/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductGrid, ProductList } from '@exo/frontend-components-commerce';
import {
  CategoryListingContainerRenderProps,
  SearchListingContainerRenderProps
} from '@exo/frontend-features-catalog-logic';
import { Filter } from '@carbon/react/icons';
import * as S from './ProductView.styles';
import { Button, Dropdown } from '@exo/frontend-components-base';

export const ProductView = ({
  mode,
  productData,
  onLoadMore,
  hasMore,
  totalResultsCount,
  sort='RELEVANCE',
  onToggleFilters,
  onSort
}: Props) => {
  const items = [
    { id: 'RELEVANCE', label: 'Most relevant' },
    { id: 'NAME', label: 'Name' },
    { id: 'PRICE_ASCENDING', label: 'Price Ascending' },
    { id: 'PRICE_DESCENDING', label: 'Price Descending' }
  ];
  return (
    <>
      <S.Header>
        <S.ItemCount>{totalResultsCount} items</S.ItemCount>
        <S.Filters>
          <Button variant="secondary" label="Filters" size="field" onClick={onToggleFilters} 
            icon={<Filter size={20} />}
          />
        </S.Filters>
        <S.Sort>
          <Dropdown<{ id: string; label: string}>
            id="sort-by"
            labelText="Sort by"
            selectedItem={items.find(i => i.id === sort)}
            itemToString={(i) => i.label}
            onChange={e => onSort(e.id)}
            items={items}
          />
        </S.Sort>
      </S.Header>
      {mode === 'grid' ? (
        <ProductGrid
          products={productData}
          routeName="catalog/products"
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          totalResultsCount={totalResultsCount}
        />
      ) : (
        <ProductList
          products={productData}
          routeName="catalog/products"
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          /*      totalResultsCount={totalResultsCount}*/
        />
      )}
    </>
  );
};

type Props = (CategoryListingContainerRenderProps | SearchListingContainerRenderProps) & {
  mode: 'grid' | 'list';
  onToggleFilters: () => void;
  onSort: (s: string) => void;
  sort?: string;
};
