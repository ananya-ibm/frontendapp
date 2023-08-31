/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import React from 'react';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { LineItem } from '@exo/frontend-features-cart-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import { Select } from './Select';
import * as S from './CartItem.styles';

export const CartItem = ({
  item,
  onUpdate = () => {},
  isReadOnly = false,
  quantities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100, 200],
  onSave,
  onEdit
}: Props) => {
  const intl = useIntl('features.cart.cart-ui.components');
  return (
    <S.CartItem>
      <S.Thumbnail>
        <img
          className="thumbnail"
          src={getClientImagePath(item.product.thumbnail)}
          alt={item.product.name}
        />
      </S.Thumbnail>

      <S.Links>
        {onSave && <Button variant="link" onClick={onSave} label="Save for Later" />}
        {onEdit && <Button variant="link" onClick={onEdit} label="Edit" />}
        {!isReadOnly && (
          <Button variant="link" onClick={() => onUpdate(item.id, 0)} label="Remove item" />
        )}
      </S.Links>

      <S.Title>
        <S.Name>{item.product.name}</S.Name>
        <S.Partnumber>{item.product.partnumber}</S.Partnumber>
      </S.Title>

      <S.Props>
       {isReadOnly ? (
          <div>
            <p>{intl.msg('CartItem.PropertyName.Quantity', 'Quantity')}</p>
            <p>{item.quantity}</p>
          </div>
        ) : (
          <Select
            label="Quantity"
            data-testid="cart-CartItem-Quantity"
            selected={item.quantity.toString()}
            onChange={(value) => onUpdate(item.id, value)}
          >
            {quantities.map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </Select>
        )}
        {item.product.selection?.map((s) =>
          s.criteria.map((c) => (
            <div key={c.id}>
              <S.PropLabel>{c.name}</S.PropLabel>
              <p>{c.value.value}</p>
            </div>
          ))
        )}
      </S.Props>

      <S.Price>
        {item.quantity > 1 && item.unitPrice && (
          <S.PricePerItem>
            <MonetaryAmount priceObject={{ list: item.unitPrice }} /> &times; {item.quantity}
          </S.PricePerItem>
        )}
        {item.linePrice && (
          <S.TotalPrice>
            <MonetaryAmount value={item.linePrice?.value} currency={item.linePrice?.currency} />
          </S.TotalPrice>
        )}
      </S.Price>
    </S.CartItem>
  );
};

type Props = {
  quantities?: number[];
  item: LineItem;
  onUpdate?: (id: string, qty: string | number) => Promise<void> | void;
  isReadOnly?: boolean;
  onSave?: () => void;
  onEdit?: () => void;
};

CartItem.Skeleton = () => {
  return (
    <S.CartItem>

    </S.CartItem>
  );
};
