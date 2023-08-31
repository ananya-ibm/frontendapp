/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

import { SkeletonLine } from '@exo/frontend-components-core';
import { Button as Btn } from '@exo/frontend-components-base';

export const DisplayFlights = styled('div')`
  background: white;

  & .cds--grid {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  & .cds--col {
    padding-left: 0;
    padding-right: 0;
  }
  & .cds--row {
    padding-left: 0;
    padding-right: 0;
  }
`;
export const PageHeader = styled('div')`
  background-color: #0d274c;
  color: white;
  padding: 1rem;
  top: 0;
  z-index: 0;
`;
export const Heading = styled('div')`
  font-size: x-large;
  margin: 1rem 0;
`;
export const Subheading = styled('div')`
  font-size: medium;
  margin: 2rem 0;
`;
export const Preferences = styled('span')`
  text-decoration: underline;
  text-decoration-color: white;
`;
export const FlightsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 26rem;

  & > * {
    margin-bottom: 1rem;
  }
  & > :last-child {
    margin-bottom: 0rem;
  }
`;
export const Flights = styled('div')`
  padding: 1rem;
  background-color: #f9f9f9;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export const NoFlights = styled('div')`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

export const Skeleton = styled(SkeletonLine)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  height: 13.2rem;
  width: 100%;
  margin-bottom: 1rem;
`;

export const SkeletonOneWay = styled(SkeletonLine)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  height: 8.2rem;
  width: 100%;
  margin-bottom: 1rem;
`;

export const SkeletonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const ConfirmButton = styled('div')`
  display: flex;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export const FindFlightButton = styled(Btn)`
  display: flex;
  flex-grow: 1;
  max-width: none;
  background-color: #2e5c99;
  justify-content: center;
  padding: 0;
  border-radius: 2px;
`;