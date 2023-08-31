/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { getClientImagePath } from '@exo/frontend-common-utils';
import { Product } from '../model/types';

export const processProductList = (nodes: ProductEdge[]) =>
  nodes?.map(({ node }) => {
    return {
      img: {
        src: getClientImagePath(node?.thumbnail ?? process.env.PRODUCT_PLACEHOLDER),
        alt: node?.name
      },
      id: node?.slug ?? node?.partnumber,
      productId: node.id,
      type: node.type,
      name: node?.name,
      price: node?.price,
      ...(node.reviews
        ? {
            rating: Math.floor(node?.reviews?.averageRating),
            reviewTotal: node?.reviews?.reviewCount,
            hasRating: true
          }
        : {}),
      availability: {
        online: node?.availability?.find(a => a.distributionGroup)?.status,
        store: node?.availability?.find(a => a.shipNode)?.status,
        storeName: node?.availability?.find(a => a.shipNode)?.shipNode?.name
      }
    };
  });

type ProductEdge = {
  node: Product;
};
