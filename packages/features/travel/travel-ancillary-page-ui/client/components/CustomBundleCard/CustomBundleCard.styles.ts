/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { ChevronRight, AddAlt } from '@carbon/react/icons';
import { ClickableTile, Tile } from '@carbon/react';

export const BundleWrapper = styled('div')`
  height: auto;
  border-radius: 4px;
`;

export const BundleHeader = styled(ClickableTile)`
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
  padding: 1rem;
`;

export const BundleHeaderTitle = styled('h1')`
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  color: #161616;
`;

export const BundleHeaderSubtitle = styled('h1')`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: #161616;
`;

export const BundleHeaderTitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const BundleHeaderDetails = styled('div')`
  display: flex;
`;

export const BundlePriceContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BundlePrice = styled(BundleHeaderTitle)``;

export const BundlePrevPrice = styled(BundleHeaderSubtitle)`
  display: flex;
  justify-content: flex-end;
  text-decoration: line-through;
`;

export const BundleHeaderDetailsIcon = styled(ChevronRight)`
  position: relative;
  width: 32px;
  height: 32px;
  top: 3px;
  left: 8px;
  cursor: pointer;
`;

export const AddMoreIcon = styled(AddAlt)`
  position: relative;
  width: 20px;
  height: 20px;
  top: 0px;
  margin-right: 0.5rem;
  fill: #2e5c99;
`;

export const PreferencesTile = styled(Tile)`
  display: flex;
  background-color: white;
  justify-content: space-between;
  border-bottom: 1px solid #f4f4f4;
`;

export const AddMore = styled('div')`
  display: flex;
  align-items: center;
`;
