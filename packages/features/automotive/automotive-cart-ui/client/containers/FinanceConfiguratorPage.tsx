/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import AutomotiveCart from '../smart-components/AutomotiveCart/AutomotiveCart';
import * as S from './CartPage.styles';

const FinanceCalculatorPage = () => {
  return (
    <>
      <S.Main>
        <Grid>
          <Row>
            <Column>
              <AutomotiveCart
                title="Customise your finance"
                description="Build your own personalised finance calculation based on the model of your choice. All changes will be saved and can be seen in Your Cart."
                hasShowCheckout={false}
                isFinanceOpen
              />
            </Column>
          </Row>

          <Row>
            <Column sm={3}>
              <Grid>
                <strong>Please note</strong>
                <br />
                This car retailer may change RRPs at any time (this includes where there are
                government changes in regulation and/or legislation). There may be a delay to any
                RRP displaying correctly on our materials. Always obtain prices from your chosen car
                retailer.
              </Grid>
              <LayoutSpacing size="sm" />
            </Column>
          </Row>
        </Grid>
      </S.Main>
    </>
  );
};

export default FinanceCalculatorPage;
