/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { ConfiguratorHero } from '../components/ConfiguratorHero/ConfiguratorHero';
import { FeatureConfig } from '../featureConfig';

export const Configuration = ({config} : Props) => {
  const useVR = config;
  return (
    <>
      <Grid>
        <Row>
          <Column>
            <ConfiguratorHero useVR={useVR?.feature.vr} />
          </Column>
        </Row>

        <Row>
          <Column>
            <LayoutSpacing size="sm" />
            <LayoutSpacing size="sm" />
            <LayoutSpacing size="sm" />
            <LayoutSpacing size="sm" />
          </Column>
        </Row>
      </Grid>
    </>
  );
};

type Props = {
  config?: FeatureConfig;
}