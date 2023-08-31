/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Toggle as Tgl } from '@carbon/react';

export const FlightToggleWrapper = styled('div')`
  font-size: 0.875rem;
  margin: 1rem 0;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const Text = styled('div')`
  margin-right: 1rem;
`;

export const Toggle = styled(Tgl)`
  color: #161616;
  & > * {
    display: flex;
  }
`;
