/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { ManageProductsContainerRenderProps } from '@exo/frontend-features-marketplace-logic';
import { ProductsTable } from './ProductsTable/ProductsTable';
import { ProductForm } from './ProductForm/ProductForm';

const DEFAULT_HEADER_DATA = [
  {
    header: 'Product name',
    key: 'id'
  },
  {
    header: 'Price',
    key: 'price'
  },
  {
    header: 'Category',
    key: 'category'
  },
  {
    header: 'Inventory',
    key: 'inventory'
  },
  {
    header: 'Listing status',
    key: 'listing_status'
  }
];
const DEFAULT_ROW_DATA = [
  {
    id: 'Watch',
    price: '630',
    category: 'New',
    inventory: 'Round robin',
    listing_status: false
  },
  {
    id: 'Kids Shoes',
    price: '264',
    category: 'Shipped',
    inventory: 'Robin Hood',
    listing_status: false
  },
  {
    id: 'Bag',
    price: '310',
    category: 'New',
    inventory: 'Robert',
    listing_status: true
  },
  {
    id: 'Trousers',
    price: '260',
    category: 'Shipped',
    inventory: 'Angelina',
    listing_status: true
  },
  {
    id: 'Dress',
    price: '520',
    category: 'Refunded',
    inventory: 'Surekha',
    listing_status: true
  },
  {
    id: 'Television',
    price: '740',
    category: 'New',
    inventory: 'Lobita',
    listing_status: false
  },
  {
    id: 'Refrigerator',
    price: '1000',
    category: 'New',
    inventory: 'Reshma',
    listing_status: true
  },
  {
    id: 'Machine',
    price: '350',
    category: 'New',
    inventory: 'King John',
    listing_status: true
  },
  {
    id: 'Pants',
    price: '220',
    category: 'Refunded',
    inventory: 'Albert',
    listing_status: false
  }
];

export const Products = ({
  headerData = DEFAULT_HEADER_DATA,
  rowData = DEFAULT_ROW_DATA,
  onCreate
}: Props) => {
  const [displayAddProduct, setDisplayAddProduct] = useState<boolean>();
  const onSubmit = values => {
    const mappedVals = {
      partnumber: values.partnumber,
      name: values.name,
      description: values.description,
      longDescription: values.longDescription,
      thumbnail: values.thumbnail,
      fullImage: values.fullImage,
      price: { list: values.price },
      type: values.type,
      status: values.status
    };
    onCreate!(mappedVals);
  };

  return !displayAddProduct ? (
    <ProductsTable
      headerData={headerData}
      rowData={rowData}
      addText="Add Product"
      setDisplayAddProduct={setDisplayAddProduct}
    />
  ) : (
    <ProductForm onBackClick={() => setDisplayAddProduct(false)} onSubmit={onSubmit} />
  );
};

type Props = ManageProductsContainerRenderProps & {
  headerData?: any;
  rowData?: any;
};
