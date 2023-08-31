/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { SmartBudgetCalculator } from '@exo/frontend-features-automotive-cart-automotive-ui/client/smart-components/SmartBudgetCalculator/SmartBudgetCalculator';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { HeroCarousel } from '../../components/HeroCarousel/HeroCarousel';
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel';
import { Marketing } from '../../components/Marketing/Marketing';
import * as S from './HomePage.styles';
import { useEffectOnce } from '@exo/frontend-common-hooks';

// ToDo: There is a bug where CMS container should in fact not be used like this, it should wrap the whole page and use CMSSpot
export const HomePage = () => {
  const eventContext = useEventContext();
  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Home page' });
  });
  return (
    <S.AutoHomePage>
      <Grid>
        <Row>
          <Column>
            {/* <Hero /> */}
            <HeroCarousel />
          </Column>
        </Row>
        <Row>
          <Column>
            <ProductCarousel />
          </Column>
        </Row>
        <Row>
          <Column>
            <S.SmartBudgetCalculator id="BudgetCalculatorSection">
              <SmartBudgetCalculator />
            </S.SmartBudgetCalculator>
          </Column>
        </Row>
        <Row>
          <Column>
            <Marketing />
          </Column>
        </Row>
        <Row>
          <Column>
            <CmsContainer name="autohomepage">
              <CmsSpot name="auto-hero" />
            </CmsContainer>
          </Column>
        </Row>
      </Grid>
    </S.AutoHomePage>
  );
};
