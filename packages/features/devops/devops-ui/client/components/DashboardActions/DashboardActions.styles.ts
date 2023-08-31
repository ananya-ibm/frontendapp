/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

// TODO: Use base components instead
import { Tile, Link } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';

export const DashboardActions = styled.div`
  padding-top: 1rem;
`;
export const DashboardActionsTitle = styled.h5`
  padding-bottom: 1rem;
`;

export const PrimaryTile = styled(Tile)`
  padding-top: 1rem;
  background-color: ${props => props.theme.colors.brand.brand1.base};
  margin-bottom: 2rem;
  min-height: 14rem;
`;
export const ActionTile = styled(Tile)`
  padding-top: 1rem;
  background-color: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  margin-bottom: 2rem;
  min-height: 14rem;
`;

export const TileTitle = styled.h4`
  padding-bottom: 1rem;
`;

export const TileAction = styled(Link)`
  padding-top: 1rem;
  position: absolute;
  bottom: 0.8rem;
`;

export const TileActionArrow = styled(ArrowRight).attrs(() => ({ size: 20 }))`
  padding-left: 0.3rem;
`;
