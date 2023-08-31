/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { SkeletonLine } from '@exo/frontend-components-core';
import theme from './ConfiguratorEntryBar.theme';

export const Skeleton = styled(SkeletonLine)`
  height: 50vh;
  max-height: 34.75rem;
  width: 100%;
`;

export const TrimPriceBar = styled('div')`
`;

export const PriceBar = styled('div')`
  background-color: ${props => theme(props).priceBarBgColor};
  border-radius: 0.25rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.2);
  margin: 0 10%;
  position: relative;
  text-align: center;
  top: -3.6rem;
  z-index: 2;
`;
