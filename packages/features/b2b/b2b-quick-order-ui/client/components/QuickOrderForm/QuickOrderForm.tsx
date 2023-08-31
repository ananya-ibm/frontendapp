/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Grid, Row, Column } from '@exo/frontend-components-base';
import { QuickOrderFormRenderProps } from '@exo/frontend-features-b2b-quick-order-logic';
import React from 'react';
import { QuickOrder } from '../QuickOrder/QuickOrder';
import * as S from './QuickOrderForm.styles';

export const QuickOrderForm = ({
  foundProducts,
  onProductSearch,
  onRemoveItem,
  onAddToCart,
  onReset,
  error,
  loading,
  onClose,
  isOpen
}: QuickOrderFormRenderProps & { onClose: () => void; isOpen: boolean }) => {
  return (
    <S.QuickOrderForm data-testid="quickorder">
      <S.Content isActive={isOpen}>
        <Grid>
          <Row>
            <Column>
              <QuickOrder
                title="Quick Order"
                description="You can add up to 25 valid SKUs below and add to cart. Stock is reserved once products are added to cart."
                onAddToCart={async () => {
                  await onAddToCart();
                  onClose();
                }}
                onSearch={onProductSearch}
                foundProducts={foundProducts}
                onRemoveItem={onRemoveItem}
                isLoading={loading}
                error={error ? 'No product found' : null}
                onReset={onReset}
              />
            </Column>
          </Row>
        </Grid>
      </S.Content>
    </S.QuickOrderForm>
  );
};
