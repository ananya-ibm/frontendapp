/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useIntl } from '@exo/frontend-common-i18n';
import React from 'react';
import { ProductAttributeTable } from '../ProductAttributeTable/ProductAttributeTable';

export const ProductDetails = ({ product }: Props) => {
  const intl = useIntl('features.catalog.catalog-ui.components.ProductDetails');
  const attributes: any = [
    ...(product.partnumber ? [{
      id: 'partnumber',
      name: 'Partnumber',
      categoryName: null,
      value: {
        id: product.partnumber,
        value: product.partnumber
      }
    }] : []),
    ...(product?.attributes ?? [])
  ];
  return (
    <>
      {attributes?.length ? (
        <ProductAttributeTable attributes={attributes} />
      ) : (
        <div>{intl.msg('title.productattributes', 'No product attributes available')}</div>
      )}
    </>
  );
};

ProductDetails.Skeleton = () => {
  return <ProductAttributeTable.Skeleton />;
};

type Props = {
  product: {
    partnumber: string;
    attributes: {
      id: string;
      name: string;
      value: {
        id: string;
        value: string;
      };
    }[];
  };
};
