/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { TextInput, Button } from '@exo/frontend-components-base';
import { MonetaryAmount } from '@exo/frontend-components-core';
import * as S from './Product.styles';

export const Product = ({
  id,
  name,
  type,
  description,
  price,
  addToBasketHandler,
  fullImage
}: Props) => {
  const [addPrd, setAddPrd] = useState({
    quantity: 1,
    productId: id,
    selectedId: ''
  });

  const onChangeHandler = (val, key) => setAddPrd({ ...addPrd, ...{ [key]: val || 0 } });

  return (
    <S.Product>
      <S.Media>
        <S.Image src={fullImage} alt={name} />
      </S.Media>
      <S.Content>
        <S.Title>{name}</S.Title>
        <S.Section>{/* <Stars /> */}</S.Section>

        <S.Price>
          <MonetaryAmount priceObject={price} />
        </S.Price>

        {description && (
          <S.Section>
            <p>{description}</p>
          </S.Section>
        )}

        <S.Section>
          <TextInput
            type="number"
            labelText="Quantity"
            id="quantity-number-input"
            value={addPrd.quantity}
            min={1}
            onChange={e => {
              const { value } = e.target;
              if (value) {
                onChangeHandler(parseInt(value, 10), 'quantity');
              }
            }}
          />

          {/* @ts-ignore */ type !== 'sku' ||
            (type !== 'baseProduct' && (
              <TextInput value="" labelText="Size" id="size-number-input" />
            ))}
        </S.Section>
        <S.Section>
          <Button
            onClick={() => {
              const productId = `${addPrd.productId}${
                addPrd.selectedId ? `--${addPrd.selectedId}` : ''
              }`;
              addToBasketHandler({
                variables: { productId, quantity: addPrd.quantity }
              });
            }}
            label="Add to Basket"
          />
        </S.Section>

        <S.Section>
          {price && (
            <span>
              {`Collect ${Math.floor(
                Number(price.list.value)
              ).toString()} points with this purchase.`}
            </span>
          )}
        </S.Section>
      </S.Content>
    </S.Product>
  );
};

type Props = {
  addToBasketHandler: (opts: { variables: { productId: string; quantity: number } }) => void;
  id: string;
  fullImage: string;
  name: string;
  type: string;
  description?: string;
  price: {
    list: {
      value: string | number;
      currency: string;
    };
  };
};
