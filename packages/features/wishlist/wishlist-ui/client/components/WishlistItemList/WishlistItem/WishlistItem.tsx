/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SkeletonLine, MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import React from 'react';
import { TrashCan } from '@carbon/react/icons';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { LineItem } from '@exo/frontend-features-wishlist-logic';
import { Select } from './Select';
import * as S from './WishlistItem.styles';

export const WishlistItem = ({
  item,
  onUpdate = () => {},
  isReadOnly = false,
  quantities = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100, 200],
  onSave,
  onEdit,
  onAddToCart
}: Props) => {
  return (
    <S.WishlistItem>
      <S.Media>
        <S.Thumbnail>
          <img src={getClientImagePath(item.item.thumbnail)} alt={item.item.name} />
        </S.Thumbnail>
        <S.Links>
          {onSave && <Button variant="link" onClick={onSave} label="Save for Later" />}
          {onEdit && <Button variant="link" onClick={onEdit} label="Edit" />}
        </S.Links>
      </S.Media>

      <S.Content>
        <S.Header>
          <S.HeaderInner>
            <S.Title>{item.item.name}</S.Title>
            <S.Description>{item.item.description} </S.Description>
          </S.HeaderInner>

          {!isReadOnly && (
            <S.Delete
              onClick={() => onUpdate(item.id, 0)}
              type="button"
              name="Delete Item"
              aria-label="Delete Item"
            >
              <TrashCan size={24} className="icon" />
            </S.Delete>
          )}

            <S.Delete
            onClick={() => onAddToCart(Number(item.quantity), item.item.partnumber, item.item.id)}
            type="button" name="Add to Cart" aria-label=" Add to Cart" >
              <S.Icon></S.Icon>
            </S.Delete>
        </S.Header>

        <S.ImageDetails>
          <S.Media className="column-alt">
            <S.Thumbnail>
              <img src={getClientImagePath(item.item.thumbnail)} alt={item.item.name} />
            </S.Thumbnail>
            <S.Links>
              {onSave && <Button variant="link" onClick={onSave} label="Save for Later" />}
              {onEdit && <Button variant="link" onClick={onEdit} label="Edit" />}
            </S.Links>
          </S.Media>

          <S.DetailsColumn>
            <S.Grid>
              <div key={item.item.id}>
                <S.PropertyName>{item.item.name}</S.PropertyName>
                <S.PropertyValue>{item.item.description}</S.PropertyValue>
              </div>
            </S.Grid>
            <S.Grid>
              {isReadOnly ? (
                <div>
                  <S.PropertyName>Quantity</S.PropertyName>
                  <S.PropertyValue>{item.quantity}</S.PropertyValue>
                </div>
              ) : (
                <Select
                  label="Quantity"
                  selected={item.quantity.toString()}
                  onChange={value => onUpdate(item.id, value)}
                >
                  {quantities.map(quantity => (
                    <option key={quantity} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </Select>
              )}
              <S.Pricing>
                {item.quantity >= 1 && item.item.price && (
                  <S.ItemPrice>
                    <MonetaryAmount priceObject={{ list: item.item.price?.list }} /> &times;{' '}
                    {item.quantity}
                  </S.ItemPrice>
                )}
                {item.item.price?.list && (
                  <S.TotalPrice>
                    <MonetaryAmount
                      quantity={item.quantity}
                      priceObject={{ list: item.item.price?.list }}
                      value={item.item.price?.list?.value}
                      currency={item.item.price?.list?.currency}
                    />
                  </S.TotalPrice>
                )}
              </S.Pricing>
            </S.Grid>
          </S.DetailsColumn>
        </S.ImageDetails>
      </S.Content>
    </S.WishlistItem>
  );
};

type Props = {
  quantities?: number[];
  item: LineItem;
  onUpdate?: (id: string, qty: string | number) => Promise<void> | void;
  isReadOnly?: boolean;
  onSave?: () => void;
  onEdit?: () => void;
  onAddToCart: (qty: number, partnumber:string, id:string) => Promise<void>| void;
};

WishlistItem.Skeleton = () => {
  return (
    <S.WishlistItem>
      <S.Media>
        <S.Thumbnail>
          <img
            className="thumbnail"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII="
          />
        </S.Thumbnail>
        <S.Links></S.Links>
      </S.Media>

      <S.Content>
        <S.Header>
          <S.HeaderInner>
            <S.Title>
              <SkeletonLine />
            </S.Title>
            <S.Description>
              <SkeletonLine />
            </S.Description>
          </S.HeaderInner>
        </S.Header>

        <S.ImageDetails>
          <S.Media className="column-alt">
            <S.Thumbnail>
              <img
                className="thumbnail"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII="
              />
            </S.Thumbnail>
            <S.Links></S.Links>
          </S.Media>

          <S.DetailsColumn>
            <S.Grid></S.Grid>
          </S.DetailsColumn>
        </S.ImageDetails>
      </S.Content>
    </S.WishlistItem>
  );
};
