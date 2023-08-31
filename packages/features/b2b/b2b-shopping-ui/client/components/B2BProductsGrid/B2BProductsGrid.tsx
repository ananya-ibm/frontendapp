/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { MonetaryAmount, SidePanel } from '@exo/frontend-components-core';
import {
  Button,
  Card,
  CardSection,
  CardFooter,
  TextInput,
  Pagination
} from '@exo/frontend-components-base';
import { CategoryListingContainerRenderProps } from '@exo/frontend-features-catalog-logic';
import { ShoppingCartPlus } from '@carbon/react/icons';

import React from 'react';
import * as S from './B2BProductsGrid.styles';
import { B2BGrid } from '../B2BGrid/B2BGrid';

export const B2BProductsGrid = ({
  productData,
  onClick,
  onCartAdd
}: CategoryListingContainerRenderProps & any) => {
  return (
    <>
      <SidePanel.Body>
        <B2BGrid>
          {productData.map(prd => (
            <Card key={prd.id} interactive>
              <CardSection type="media">
                <img
                  onClick={() => onClick(prd.id, prd.type)}
                  style={{
                    width: '100%',
                    maxHeight: '5rem',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                  src={prd.img.src}
                />
              </CardSection>
              <CardSection>
                <div style={{ fontSize: '90%' }}>{prd.name}</div>
              </CardSection>
              <div style={{ marginTop: 'auto' }}>
                <CardSection>
                  <S.Price>
                    <MonetaryAmount priceObject={prd.price} />
                  </S.Price>
                </CardSection>
                <CardFooter>
                  <S.AddToCart>
                    <TextInput
                      disabled={prd.type !== 'sku'}
                      size="sm"
                      id="quantity"
                      min={1}
                      type="number"
                      value={1}
                    />
                    <Button
                      tooltip="Add to cart"
                      size="small"
                      icon={<ShoppingCartPlus size={20} />}
                      variant="primary"
                      disabled={prd.type !== 'sku'}
                      onClick={() => onCartAdd(prd.productId, 1)}
                    />
                  </S.AddToCart>
                </CardFooter>
              </div>
            </Card>
          ))}
        </B2BGrid>
      </SidePanel.Body>
      <SidePanel.Footer>
        <S.PaginationWrapper>
          <Pagination total={134} onChange={() => {}} />
        </S.PaginationWrapper>
      </SidePanel.Footer>
    </>
  );
};

B2BProductsGrid.Skeleton = () => {
  return (
    <SidePanel.Body>
      <B2BGrid />
    </SidePanel.Body>
  );
};
