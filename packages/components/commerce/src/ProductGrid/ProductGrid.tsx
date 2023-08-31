/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Button } from '@exo/frontend-components-base';
import { ProductCard } from '../ProductCard/ProductCard';
import * as S from './ProductGrid.styles';

// Note here the similarity between the props required for this and ProductList, but also what is different
export const ProductGrid = ({
  products,
  routeName,
  components,
  hasCartIcon,
  pricePrefix,
  hasMore,
  totalResultsCount,
  onLoadMore
}: Props) => {
  const intl = useIntl('features.catalog.catalog-ui.pages.ProductDetailsPage');
  return (
    <div>
      <S.ProductGrid>
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
                <ProductCard
                  currency={product?.price?.list?.currency}
                  description={product.description}
                  hasAddToCart={product.hasAddToCart}
                  hasRating={product.hasRating}
                  hasCartIcon={hasCartIcon}
                  id={product.id}
                  img={product.img}
                  linkTag={components}
                  monthlyPrice={product.monthlyPrice}
                  name={product.name}
                  onAddToCart={product.onAddToCart}
                  onFavourite={product.onFavourite}
                  price={product.price}
                  pricePrefix={pricePrefix}
                  rating={product.rating}
                  routeName={routeName}
                  subscriptionCost={product.subscriptionCost}
                  availability={availability}
                />
              </S.Item>
            );
          })}
      </S.ProductGrid>

      {totalResultsCount && (
        <S.Summary>
          Showing {products.length} of {totalResultsCount} items
        </S.Summary>
      )}

      <S.Actions>
        {hasMore && onLoadMore && <Button variant='tertiary' onClick={onLoadMore} label={intl.msg('button.loadmore', 'Load more...')} />}
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
    linkTag?: string | React.ReactElement;
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
  totalResultsCount?: number;
  routeName?: string;
  components?: React.ReactElement;
  hasCartIcon?: boolean;
  pricePrefix?: string;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadMoreLabel?: string;
};
