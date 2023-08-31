/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Column, Grid, Row } from '@exo/frontend-components-base';

export const ContentPageWithSpots = ({ id }: { id: string }) => {
  return (
    <>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <CmsContainer name={`${id}-page`} spec={{ type: 'contentWithSpots' }}>
              <CmsSpot name='hero'>
                This is where the hero would go with CMS configured
              </CmsSpot>

              <h1>Title {id}</h1>

              <CmsSpot name="sections">
                This is where the rest of the sections would go with CMS configured
              </CmsSpot>
            </CmsContainer>
          </Column>
        </Row>
      </Grid>

      <LayoutSpacing size="xl" />
    </>
  );
};
