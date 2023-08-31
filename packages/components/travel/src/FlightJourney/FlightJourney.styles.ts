/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import {
    ArrowRight,
    ArrowsHorizontal
  } from '@carbon/react/icons';

export const JourneyContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;
export const Journey = styled('div')`
  display: flex;
  flex-direction: row;
`;

export const Airport = styled('span')`
  font-weight: 700;
  font-size: 1rem;
`;

export const ArrowBothWays = styled(ArrowsHorizontal)`
  position: relative;
  margin: 0 0.5rem;
`;

export const Arrow = styled(ArrowRight)`
  position: relative;
  margin: 0 0.5rem;
`;

export const Price = styled('div')`
  font-weight: 900;
`;