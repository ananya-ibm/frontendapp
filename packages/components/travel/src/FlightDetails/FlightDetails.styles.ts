/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

import { FlightInfoSegment as FlightInfoSgmt } from '../FlightInfoSegment/FlightInfoSegment';
import { Button as CarbonBtn } from '@exo/frontend-components-base';
import { FlightJourney as FlightJny } from '../FlightJourney/FlightJourney';

export const FlightDetails = styled('div')`
  background-color: white;
  border-bottom: 1px solid #f4f4f4;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const Data = styled('div')`
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  flex-direction: column;
`;

export const DataWrapper = styled('div')``;
export const Button = styled(CarbonBtn)`
  display: flex;
  font-size: 0.8rem;
  flex-shrink: 1;
  color: #2e5c99;
  text-decoration: none;
  font-weight: 400;
`;

export const FlightJourney = styled(FlightJny)``;

export const SearchParams = styled('div')`
  margin-top: 0.5rem;
`;

export const FlightInfoSegment = styled(FlightInfoSgmt)`
  margin-right: 1.2rem;
`;

export const PriceWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Price = styled('span')`
  font-size: 1rem;
  color: #111;
  font-weight: 700;
  justify-content: right;
`;