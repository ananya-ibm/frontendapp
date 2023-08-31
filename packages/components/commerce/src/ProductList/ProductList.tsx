/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import { ProductRow } from '../ProductRow/ProductRow';
import * as S from './ProductList.styles';

// Note here the similarity between the props required for this and ProductGrid, but also what is different
export const ProductList = ({
  products,
  routeName,
  pricePrefix,
  isSummaryHidden,
  pageSummary,
  hasMore,
  onLoadMore,
  loadMoreLabel = 'Load more'
}: Props) => {
  return (
    <div>
      {!isSummaryHidden && pageSummary && (
        <S.PaginationWrapper>
          <S.PageSummaryText>{`Showing ${pageSummary}`}</S.PageSummaryText>
        </S.PaginationWrapper>
      )}
      <S.ProductList>
        {products &&
          products.map(product => {
            const availability: any[] = [];
            if (product?.availability?.online) {
              availability.push({
                id: 'online',
                status: product.availability.online.toLowerCase(),
                label: 'Online'
              });
            }
            if (product?.availability?.store) {
              availability.push({
                id: 'store',
                status: product.availability.store.toLowerCase(),
                label: product?.availability?.storeName
              });
            }
            return (
              <S.Item key={`product-grid-product-${product.id}`}>
                <ProductRow
                  currency={product.price?.list?.currency}
                  description={product.description}
                  id={product.id}
                  img={product.img}
                  monthlyPrice={product.monthlyPrice}
                  name={product.name}
                  price={product?.price}
                  pricePrefix={pricePrefix}
                  routeName={routeName}
                  subscriptionCost={product.subscriptionCost}
                  availability={availability}
                />
              </S.Item>
            );
          })}
      </S.ProductList>
      <S.Actions>
        {hasMore && onLoadMore && <Button onClick={onLoadMore} label={loadMoreLabel} />}
      </S.Actions>
    </div>
  );
};

type Props = {
  products: {
    className?: string;
    id: number | string;
    name: string;
    description?: string;
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
    hasAddToCart?: boolean;
    hasRating?: boolean;
    monthlyPrice?: string;
    onAddToCart?: () => void;
    onFavourite?: () => void;
    rating?: number;
    img: {
      src?: string;
      alt?: string;
    };
    routeName?: string;
    subscriptionCost?: {
      currency?: string;
      price?: string;
      rate?: string;
    };
    availability?: {
      online?: string;
      store?: string;
      storeName?: string;
    };
  }[];
  routeName?: string;
  components?: React.ReactElement;
  pricePrefix?: string;
  isSummaryHidden?: boolean;
  pageSummary?: string;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadMoreLabel?: string;
};
