/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';

import { Tile, SelectableTile } from '@carbon/react';

export const BundleOptionTile = styled(SelectableTile)`
  background-color: white;
  border: none;
  border-bottom: 1px solid #f4f4f4;

  & .cds--tile__checkmark {
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    background-color: white;
  }
`;

export const TravelPackageOptionTile = styled(Tile)`
  background-color: white;
  border: none;
  border-bottom: 1px solid #f4f4f4;

  &:hover {
    background-color: white;
    cursor: default;
  }
`;

export const TileInfoContainer = styled('div')`
  display: flex;
`;

const sharedIconStyle = css`
  position: relative;
  width: 18px;
  height: 18px;
  top: 8px;
  margin-right: 1rem;
  fill: #2e5c99;
`;

export const Icon = styled('svg')`
  ${sharedIconStyle}
`;

export const TileInfo = styled('h1')`
  font-size: 14px;
  font-weight: 400;
  color: #161616;
`;
export const TilePrice = styled('span')`
  margin-left: 0.5rem;
  font-size: 0.75rem;
  font-weight: 400;
  color: #8D8D8D;
`;
