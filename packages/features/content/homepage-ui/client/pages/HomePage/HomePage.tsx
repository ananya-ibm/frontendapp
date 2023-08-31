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
import { ContentList, Hero } from '@exo/frontend-components-content';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { useIntl } from '@exo/frontend-common-i18n';
import { useTheme } from 'styled-components';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { useEffectOnce } from '@exo/frontend-common-hooks';

export const HomePage = () => {
  const eventContext = useEventContext();
  const currentTheme = useTheme();
  const intl = useIntl('features.content.homepage-ui.pages.HomePage');

  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Home page' });
  });

  return (
    <Grid>
      <Row>
        <Column>
          <CmsContainer name="homepage">
            <CmsSpot name="main" render={(content) => <ContentList>{content}</ContentList>}>
              <Hero
                subtitle={intl.msg('hero.subtitle', 'IBM iX')}
                title={intl.msg('hero.title', 'Accelerator Storefront')}
                text={intl.msg(
                  'hero.body',
                  'Here you can see our latest React frontend connected to our Experience Orchestrator GraphQL adapters.'
                )}
                image={currentTheme.static.tempImg}
                ctaText={intl.msg('hero.cta', 'View Products')}
                ctaLink="/catalog/category/Apparel_1"
              />
            </CmsSpot>
          </CmsContainer>
        </Column>
      </Row>
      <LayoutSpacing size="xl" />
    </Grid>
  );
};
