/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TrashCan } from '@carbon/react/icons';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Button, TextInput } from '@exo/frontend-components-base';
import * as S from './QuickOrder.styles';

export const ProductRow = ({ onRemove, name, price, qty, id, image }: Props) => {
  return (
    <tr>
      <S.Td>
        <TextInput id={`form-for-${id}`} labelText="Product SKU" type="text" value={id} />
      </S.Td>
      <S.Td>
        {image && (
          <S.Product>
            <S.Image src={image ?? process.env.PRODUCT_PLACEHOLDER} alt={name} />
            <S.Name>{name}</S.Name>
          </S.Product>
        )}
      </S.Td>
      <S.Td>{price && <MonetaryAmount priceObject={price} />}</S.Td>
      <S.Td>{qty}</S.Td>
      <S.Td>
        <MonetaryAmount priceObject={price} quantity={qty} />
      </S.Td>
      <S.Td>
        {id && (
          <Button
            variant="danger"
            aria-label="delete"
            onClick={() => onRemove(id)}
            icon={<TrashCan size={16} />}
          />
        )}
      </S.Td>
    </tr>
  );
};

type Price = {
  value: string;
  currency: string;
};

type Props = {
  id: string;
  onRemove: (id: string) => void;
  name: string;
  image: string;
  qty: number;
  price: {
    list: Price;
    offer?: Price;
  };
};
