/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MonetaryAmount } from '@exo/frontend-components-core';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { addImageExt } from '@exo/frontend-common-utils';
import { ImageTile } from '../ImageTile/ImageTile';

import * as S from './ProductRow.styles';

export const Link = ({ to, children, name, className }: LinkProps) => (
  <ReactLink to={to} title={name} className={className}>
    {children}
  </ReactLink>
);

// The props for this component are closely tied to those of ProductList
export const ProductRow = ({
  className,
  currency,
  description,
  id,
  img,
  name,
  price,
  pricePrefix,
  monthlyPrice,
  routeName,
  subscriptionCost,
  availability
}: Props) => {
  const ProductLink = Link;

  return (
    <S.ProductRow className={className} data-testid="product-row">
      <ProductLink to={`/${routeName}/${id}`} name={name} className="productrow-link">
        <S.Media>
          <ImageTile src={addImageExt(img.src)} alt={img.alt} />
        </S.Media>
        <S.Content>
          <S.Body>
            <S.Title>{name}</S.Title>
            {description && <S.Description>{description}</S.Description>}
            {price && (
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
        </S.Content>
      </ProductLink>
    </S.ProductRow>
  );
};

type Props = {
  className?: string;
  currency?: string;
  description?: string;
  id: string | number;
  img: {
    src?: string;
    alt?: string;
  };
  linkTag?: React.ReactElement;
  name: string;
  price: {
    list?: {
      value: string | number;
      currency: string;
    };
    offer?: {
      value: string | number;
      currency: string;
    };
  };
  pricePrefix?: string;
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
