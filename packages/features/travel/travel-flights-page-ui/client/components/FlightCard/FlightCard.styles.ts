/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from '@carbon/react';

export const FlightCard = styled('div')`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: ${(props: { grayOut: boolean }) => (props.grayOut ? '#EEEEEE' : 'white')};
  transition: 200ms;
  outline: 1px solid #f4f4f4;
  &:hover {
    background-color: #eeeeee;
    cursor: pointer;
  }
`;
export const FlightData = styled('div')`
  background-color: transparent;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  border-radius: 5px 5px 0 0;
  justify-content: space-between;
`;
export const Time = styled('div')`
  font-size: medium;
  font-weight: 700;
`;
const FirstLineMarginBottom = css`
  margin-bottom: 0.5rem;
`;
export const TravelDataTop = styled('div')`
  ${FirstLineMarginBottom};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const TravelDataBottom = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FlightIconWrapper = styled('div')`
  width: 6rem;
  margin: 0 0.5rem;
`;
export const IATA = styled('div')`
  font-size: medium;
`;
export const DataLeft = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* justify-content: space-between; */
`;
export const DataRight = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  margin-left: 1rem;
  align-items: flex-end;
  justify-content: space-between;
`;
export const Duration = styled('div')`
  font-size: small;
  color: #8d8d8d;
`;
export const Price = styled('div')`
  font-size: large;
  font-weight: 700;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 1rem 1rem 0 0;
`;
export const FlightNo = styled('div')`
  font-size: small;
  font-weight: 400;
`;
export const MatchIconWrapper = styled('div')``;
export const Tile = styled(ExpandableTile)`
  background-color: transparent;
  border-radius: 0 0 0 5px;
  min-height: 0.5rem;
  &:hover {
    background-color: transparent;
  }
  &:focus {
    background-color: transparent;
    outline: none;
  }
  &:active {
    background-color: transparent;
  }
`;
export const TileContent = styled('span')`
  color: #161616;
  font-size: small;
  text-align: justify;
`;
export const AboveData = styled(TileAboveTheFoldContent)``;
export const BelowData = styled(TileBelowTheFoldContent)``;
export const BottomContainer = styled('div')`
  background-color: transparent;
  display: block;
  border-top: 1px solid #f4f4f4;
  display: flex;
`;
