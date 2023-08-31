/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import {
  HeroPageTitle,
  HorizontalContentCard,
  ContentCard
} from '@exo/frontend-components-content';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { SmartBudgetCalculator } from '../smart-components/SmartBudgetCalculator/SmartBudgetCalculator';
import heroImage from '../static/images/finance/finance-hero.jpg';

const FinancePage = () => {
  return (
    <>
      <HeroPageTitle title="Finance &amp; Offers" image={heroImage} />
      <Grid>
        <Row>
          <Column>
            <SmartBudgetCalculator />
          </Column>
        </Row>
        <Row>
          <Column>
            <h2>Our finance plans</h2>
            <LayoutSpacing size="sm" />
            <HorizontalContentCard
              title="Personal Contract Purchase (PCP)"
              img="https://picsum.photos/700/500"
              text="Personal contract purchase gives you the opportunity to change your car more often. By deferring part of the cost to the end it means you can reduce the length of your agreement, and at the end you have the ability to keep, exchange or return your vehicle."
              linkText="More info"
              link="#"
              hasAlwaysShadow
              isImageRight
            />
            <LayoutSpacing size="sm" />
            <HorizontalContentCard
              title="Cash Purchase (Self Funding)"
              img="https://picsum.photos/701/500"
              text="Personal contract purchase gives you the opportunity to change your car more often. By deferring part of the cost to the end it means you can reduce the length of your agreement, and at the end you have the ability to keep, exchange or return your vehicle."
              linkText="More info"
              link="#"
              hasAlwaysShadow
            />
          </Column>
        </Row>
        <LayoutSpacing size="sm" />
        <h2>Discover our offers</h2>
        <LayoutSpacing size="sm" />
        <Row>
          <Column>
            <ContentCard
              title="Finance Offers"
              img={getClientImagePath('/static/catalog/pdp/finance_offers.jpg')}
              text="Some offer would go here"
              linkText="Learn More"
              link="#"
              hasAlwaysShadow
            />
          </Column>
          <Column>
            <ContentCard
              title="Vehicle Offers"
              img={getClientImagePath('/static/catalog/pdp/vehicle_offers.jpg')}
              text="Some offer would go here"
              linkText="Learn More"
              link="#"
              hasAlwaysShadow
            />
          </Column>
          <Column>
            <ContentCard
              title="Accessories"
              img={getClientImagePath('/static/catalog/pdp/vehicle_offers.jpg')}
              text="Some offer would go here"
              linkText="Learn More"
              link="#"
              hasAlwaysShadow
            />
          </Column>
        </Row>
        <LayoutSpacing size="sm" />
      </Grid>
    </>
  );
};

export default FinancePage;
