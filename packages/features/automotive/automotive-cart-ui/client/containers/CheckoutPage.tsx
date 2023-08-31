/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { useCarts } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { useSessionContext } from '@exo/frontend-common-session-context';
import Checkout from '../smart-components/Checkout/Checkout';
import * as S from './CheckoutPage.styles';

const CheckoutPage = () => {
  const { cartId, financeOption } = useSessionContext();
  const getCarts = useCarts();
  const { data, error, loading } = getCarts.getCarts();

  if (loading) return <S.Skeleton />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const isFinanced = financeOption && financeOption.type === 'PERSONAL_CONTRACT_PURCHASE';
  const isEmptyCart =
    (data && !data.me.carts) || (data && data.me.carts && !data.me.carts[0].lineItems);

  return (
    <S.CheckoutPage>
      <LayoutSpacing size="sm" />
      <Grid>
        <Row>
          <Column>
            <Breadcrumb
              path={[
                {
                  url: '/cart/checkout',
                  label: 'Checkout'
                }
              ]}
            />
            <LayoutSpacing size="sm" />
          </Column>
        </Row>

        <Row>
          <Column sm={'100%'}>
            <h1 className="title">Checkout</h1>
            <LayoutSpacing size="sm" />
          </Column>
        </Row>
        {!isEmptyCart && <Checkout cartId={cartId!} isFinanced={isFinanced} />}
        {isEmptyCart && 'Your cart is currently empty'}
      </Grid>
    </S.CheckoutPage>
  );
};

export default CheckoutPage;
