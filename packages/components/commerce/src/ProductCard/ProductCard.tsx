/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Bag, MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { addImageExt } from '@exo/frontend-common-utils';
import { Stars } from '../Stars/Stars';
import { ImageTile } from '../ImageTile/ImageTile';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

import * as S from './ProductCard.styles';

const Link = ({ to, children, name, className }: LinkProps) => (
  <ReactLink to={to} title={name} className={className}>
    {children}
  </ReactLink>
);

// The props for this component are closely tied to those of ProductGrid
export const ProductCard = ({
  className,
  description,
  hasAddToCart,
  hasRating,
  hasCartIcon,
  id,
  img,
  linkTag,
  name,
  onAddToCart,
  onFavourite,
  price,
  pricePrefix,
  monthlyPrice,
  rating = 3,
  routeName = '#',
  subscriptionCost,
  availability,
  currency
}: Props) => {
  const ProductLink = (linkTag || {}).Link || Link;

  return (
    <S.ProductCard className={className} data-testid="product-card">
      <ProductLink to={`/${routeName}/${id}`} title={name} className="productcard-link">
        {hasCartIcon && (
          <S.Bag>
            <Bag />
          </S.Bag>
        )}
        <S.Media>
          <ImageTile src={addImageExt(img.src)} alt={img.alt} />
        </S.Media>
        <S.Content>
          <S.Body>
            <S.Title>{name}</S.Title>
            {description && <S.Description>{description}</S.Description>}
            {price && price.list && (
              <S.Price>
                <MonetaryAmount prefix={pricePrefix} priceObject={price} />
              </S.Price>
            )}
            {monthlyPrice && (
              <S.MonthlyPrice>
                <MonetaryAmount prefix="From " value={monthlyPrice} currency={currency} /> per month
              </S.MonthlyPrice>
            )}
            {subscriptionCost && (
              <S.Subscription>
                <MonetaryAmount
                  value={subscriptionCost.price}
                  currency={subscriptionCost.currency}
                  rate={subscriptionCost.rate}
                />
              </S.Subscription>
            )}
            {hasRating && (
              <S.Rating>
                <Stars totalStars={5} rating={rating} />
              </S.Rating>
            )}
            {availability && availability?.length > 0 && (
              <S.AvailabilitySection>
                {availability.map(a => (
                  <S.AvailabilityEntry key={a.id} status={a.status}>
                    {a.label}
                  </S.AvailabilityEntry>
                ))}
              </S.AvailabilitySection>
            )}
          </S.Body>
          {hasAddToCart && (
            <S.Button>
              <Button variant="secondary" onClick={onAddToCart} label="Add To Cart" />
            </S.Button>
          )}
        </S.Content>
      </ProductLink>
      {onFavourite && (
        <FavoriteButton
          id={`favorite-${name.replace(/ /g, '-').toLowerCase()}`}
          onChange={onFavourite}
        />
      )}
    </S.ProductCard>
  );
};

export type ProductCardProductType = {
  description?: string;
  id: string | number;
  img: {
    src?: string;
    alt?: string;
  };
  name: string;
  price: {
    list?: {
      value: number | string;
      currency: string;
    };
    offer?: {
      value: number | string;
      currency: string;
    };
  };
  pricePrefix?: string;
  rating?: number;
}

type Props = ProductCardProductType & {
  currency?: string;
  className?: string;
  hasAddToCart?: boolean;
  hasRating?: boolean;
  hasCartIcon?: boolean;
  linkTag?: any;
  onAddToCart?: () => void;
  onFavourite?: () => void;
  routeName?: string;
  subscriptionCost?: {
    currency?: string;
    price?: string;
    rate?: string;
  };
  monthlyPrice?: string;
  availability?: {
    id: string;
    status: 'available' | 'low' | 'unavailable' | 'unknown' | 'none';
    label: React.ReactElement | string;
  }[];
};

type LinkProps = {
  children?: any;
  name?: string;
  to?: string;
  className?: string;
};
