/* eslint-disable no-unused-vars */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/prop-types */

import React from 'react';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { ProductGrid } from '@exo/frontend-components-commerce';

export const BaseProductGrid = ({ products }) => {
  const {
    // called,
    loading,
    data,
    error,
    onLoadMore
    // fetchMore
  } = products;
  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>There has been an error.</p>;

  const productData = data?.products?.edges?.map(({ node }) => ({
    img: node?.thumbnail
      ? { src: `${getClientImagePath(node?.thumbnail)}`, alt: node?.name }
      : { src: process.env.PRODUCT_PLACEHOLDER, alt: node?.name },
    id: node?.partnumber,
    name: node?.name,
    price: node?.price,
    currency: node?.price?.list?.currency,
    // rating: Math.floor(node?.reviews?.averageRating),
    // reviewTotal: node?.reviews?.reviewCount,
    rating: 5,
    reviewTotal: 10
  }));

  return (
    <>
      <ProductGrid
        products={productData}
        routeName="marketplace/store/:storeId"
        onLoadMore={onLoadMore}
        hasMore={data.products.pageInfo.hasNextPage}
      />
    </>
  );
};
