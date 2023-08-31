/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer } from '@exo/frontend-content-api';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Column, Grid, Row } from '@exo/frontend-components-base';

export const ContentPage = ({ id }: { id: string }) => {
  return (
    <>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <CmsContainer name={`${id}-page`} spec={{ type: 'content' }}>Some content to be replaced by the CMS</CmsContainer>
          </Column>
        </Row>
      </Grid>

      <LayoutSpacing size="xl" />
    </>
  );
};
