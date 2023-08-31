/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { addImageExt } from '@exo/frontend-common-utils';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { Tile } from '../Tile/Tile';
import * as S from './Configurator.styles';

export const ProductsGrid = ({
  topActive,
  subcat,
  products,
  handleProductClick,
  isExpanded
}: Props) => {
  const eventContext = useEventContext();
  const onClick = async product => {
    eventContext?.createEvent({
      event_code: 'product_select',
      product: {
        cat: subcat,
        parent: topActive,
        id: product.id,
        // Inverting here seems weird but this is the way the configurator works - strange
        isSelected: false
      }
    });
    await handleProductClick(product);
  };

  return (
    <S.ProductsGrid isExpanded={isExpanded}>
      {products?.map(product => (
        <S.Product
          key={product.id}
          type="button"
          onClick={() => onClick(product)}
          isExpanded={isExpanded}
          isDisabled={!product.isAvailable}
        >
          <Tile
            image={addImageExt(product.thumbnail)}
            title={product.name!}
            isSmall={!isExpanded}
            price={product.price}
            isActive={product.isSelected}
          />
        </S.Product>
      ))}
    </S.ProductsGrid>
  );
};

type Props = {
  topActive?: string;
  subcat?: string;
  handleProductClick: (product: any) => Promise<void> | void;
  isExpanded?: boolean;
  products: {
    id?: string;
    name?: string;
    isAvailable?: boolean;
    isSelected?: boolean;
    thumbnail?: string;
    price?: {
      prefix?: string;
      currency?: string;
      value?: string;
    };
  }[];
};
