/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ButtonGroup, Button } from '@exo/frontend-components-base';
import { SearchRow } from './SearchRow';
import { ProductRow } from './ProductRow';
import * as S from './QuickOrder.styles';

export const QuickOrder = ({
  title,
  description,
  onAddToCart,
  onSearch,
  placeholder = 'Enter SKU',
  foundProducts,
  isLoading,
  onReset,
  error,
  onRemoveItem
}: Props) => {
  return (
    <S.QuickOrder>
      {title && <h2>{title}</h2>}
      {description && <S.Body>{description}</S.Body>}

      <S.Table>
        <tbody>
          <tr>
            <S.Th>
              <span className="sr">Search</span>
            </S.Th>
            <S.Th>Product</S.Th>
            <S.Th>Price</S.Th>
            <S.Th>Qty</S.Th>
            <S.Th>Total</S.Th>
            <S.Th>
              <span className="sr">Action</span>
            </S.Th>
          </tr>
          {foundProducts?.length > 0 &&
            foundProducts.map(product => (
              <ProductRow
                key={product.id}
                id={product.partnumber}
                onRemove={onRemoveItem}
                name={product.name}
                qty={product.qty ?? 1}
                image={product.thumbnail}
                price={product.price}
              />
            ))}
          <SearchRow
            placeholder={placeholder}
            onSearch={onSearch}
            errorMessage={error}
            isLoading={!!isLoading}
          />
        </tbody>
      </S.Table>
      <ButtonGroup>
        <Button variant="link" onClick={onReset} label="Reset form" />
        <Button onClick={onAddToCart} label="Add to cart" />
      </ButtonGroup>
    </S.QuickOrder>
  );
};

type Price = {
  value: string;
  currency: string;
};

type Props = {
  description: string;
  foundProducts: {
    id: string;
    partnumber: string;
    name: string;
    thumbnail: string;
    price: {
      list: Price;
      offer?: Price;
    };
    qty: number;
  }[];
  onAddToCart: () => Promise<void>;
  onSearch: (term: string) => Promise<void>;
  placeholder?: string;
  title: string;
  isLoading?: boolean;
  onReset: () => void;
  error?: any;
  onRemoveItem: (id: string) => void;
};
