/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Button as Btn } from '@exo/frontend-components-base';
import { ArrowsVertical } from '@carbon/react/icons';

export const FlightAirportContainer = styled('div')`
  display: flex;
  justify-content: space-around;
`;

export const FlightAirportWrapper = styled('div')`
  margin: 1rem;
`;

export const UpperFlightButton = styled(Btn)`
  background-color: white;
  color: #525252;
  width: 100%;
  border: 1px solid #E5E5E5;
  border-radius: 2px 2px 0 0;
  max-width: none;

  &:hover {
    background-color: #f4f4f4;
    color: #525252;
  }
`;
export const LowerFlightButton = styled(Btn)`
  background-color: white;
  color: #525252;
  max-width: none;
  width: 100%;
  border-left: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  border-right: 1px solid #E5E5E5;
  border-radius: 0 0 2px 2px;

  &:hover {
    background-color: #f4f4f4;
    color: #525252;
  }
`;

export const SwitchIcon = styled(ArrowsVertical)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;
export const SwitchIconButton = styled('div')`
  border: 1px solid #E5E5E5;
  position: absolute;
  display: inline-block;
  right: 0.5rem;
  top: 1.7rem;
  z-index: 1;
  background-color: white;
  border-radius: 5rem;
  height: 2.5rem;
  width: 2.5rem;
  &:hover {
        background-color: #F2F2F2;
        cursor: pointer;
    }
    &:active {
        background-color: #E5E5E5;
        cursor: pointer;
        transition: 100ms;
    }
`;
export const AirportsPicker = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
