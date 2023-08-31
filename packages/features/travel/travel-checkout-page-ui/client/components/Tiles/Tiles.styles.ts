/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';

import { Tile } from '@carbon/react';

export const BundleOptionTile = styled(Tile)`
  background-color: white;
  border: none;
  border-bottom: 1px solid #f4f4f4;


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
background-color: white;
display: flex;
flex-direction: column;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const TilePrice = styled('div')`
`;