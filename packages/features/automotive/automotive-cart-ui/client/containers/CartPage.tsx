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
import AutomotiveCart from '../smart-components/AutomotiveCart/AutomotiveCart';
import * as S from './CartPage.styles';

const CartPage = () => {
  return (
    <>
      <S.Main>
        <Grid>
          <S.Title>
            <Row>
              <Column>
                <Breadcrumb path={[{ url: '/cart/cart', label: 'Cart' }]} />
                <LayoutSpacing size="sm" />
              </Column>
            </Row>
          </S.Title>

          <Row>
            <Column>
              <AutomotiveCart />
              <LayoutSpacing size="2xl" />
            </Column>
          </Row>
        </Grid>
      </S.Main>
    </>
  );
};

export default CartPage;
