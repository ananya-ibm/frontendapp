/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';
import { Tile, ClickableTile, SelectableTile, IconButton as IconBtn } from '@carbon/react';
import { Departure, StarFilled, ChevronRight, Add, Subtract } from '@carbon/react/icons';

export const StarIcon = styled(StarFilled)`
  color: #f1c21b;
  margin-right: 1rem;
  visibility: ${props => (props.isvisible ? 'visible' : 'hidden')};
`;
export const PlaneIcon = styled(Departure)`
  color: #161616;
  margin-right: 1rem;
`;

export const ChevronIcon = styled(ChevronRight)`
  color: #161616;
`;

export const AddButton = styled(Add)`
  color: #161616;
  margin-right: 1rem;
`;

export const SubtractButton = styled(Subtract)`
  color: #161616;
  margin-right: 1rem;
`;

export const ClickTile = styled(ClickableTile)`
  border-top: 0.0625rem solid #e5e5e5;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PassengerTile = styled(Tile)`
  border-top: 0.0625rem solid #e5e5e5;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ClassTile = styled(SelectableTile)`
  border-top: 0.0625rem solid #e5e5e5;
  background-color: white;
`;

export const BottomInfo = styled('div')`
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75rem;
`;
export const TopInfo = styled('div')`
  font-size: 0.875rem;
  font-weight: 700;
`;

export const ClassTopInfo = styled(TopInfo)`
  display: flex;
  align-items: center;
`;

export const IATA = styled('div')`
  font-size: 1rem;
  display: flex;
  flex-shrink: 1;
  flex-grow: 0;
  align-items: center;
  justify-content: right;
`;
export const Info = styled('div')`
  flex-direction: column;
  display: flex;
  flex-grow: 1;
  margin-right: 1rem;
  justify-content: space-between;
`;

export const IconButton = styled(IconBtn)`
  background-color: white;
  color: #525252;
  width: 10%;
  border-radius: 2px 2px 0 0;

  &:hover {
    background-color: #f4f4f4;
    color: #525252;
  }
`;

export const PassengerNumber = styled('div')``;
