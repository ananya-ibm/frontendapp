/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './DashboardActions.styles';

// TODO: Use base components instead
import { Tile, Row, Column } from '@carbon/react';

export const DashboardActions = ({}: Props) => {
  return <S.DashboardActions>
    <Tile>
      <S.DashboardActionsTitle>Actions</S.DashboardActionsTitle>
      <Row>
        <Column sm={16} md={4} lg={4} xlg={3}>
          <S.PrimaryTile>
            <S.TileTitle>Build</S.TileTitle>
            <p>Explore EXO Cloud with a selection of DevOps tools. From here you can spin up new Experience Orchestrator demo and test environments using pre-built templates or create your own.</p>
          </S.PrimaryTile>
        </Column>
        <Column sm={16} md={4} lg={4} xlg={3}>
          <S.ActionTile>
            <S.TileTitle>Browse App Catalog</S.TileTitle>
            <p>Browse EXO application templates in the catalog to see a list of pre-configured Experience Orchestrator demos.</p>
            <S.TileAction href='/devops/catalog'>
              Browse App Catalog
              <S.TileActionArrow />
            </S.TileAction>
          </S.ActionTile>
        </Column>
        <Column sm={16} md={4} lg={4} xlg={3}>
          <S.ActionTile>
            <S.TileTitle>View Deployed Instances</S.TileTitle>
            <p>View your live EXO applications.</p>
            <S.TileAction href='/devops/deployments'>
              View Deployments
              <S.TileActionArrow />
            </S.TileAction>
          </S.ActionTile>
        </Column>
        <Column sm={16} md={4} lg={4} xlg={3}>
          <S.ActionTile>
            <S.TileTitle>EXO Docs</S.TileTitle>
            <p>Check out the EXO tutorials to get started building Experience Orchestrator applications.</p>
            <S.TileAction href='https://pages.github.ibm.com/ixliberty/ixl-tutorial-website/'>
              View Tutorials
              <S.TileActionArrow />
            </S.TileAction>
          </S.ActionTile>
        </Column>
      </Row>
    </Tile>
  </S.DashboardActions>;
};

type Props = {};
