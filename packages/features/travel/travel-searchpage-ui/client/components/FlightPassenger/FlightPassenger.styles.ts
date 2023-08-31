/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Button as Btn } from '@exo/frontend-components-base';

export const FlightPassengerWrapper = styled('div')`
  display: flex;
  margin-bottom: 1rem;
`;

export const PassengerButton = styled(Btn)`
  background-color: white;
  color: #525252;
  display: flex;
  justify-content: start;
  flex-grow: 1;
  max-width: none;
  border: 1px solid #e5e5e5;
  border-radius: 2px;

  &:hover {
    background-color: #f4f4f4;
    color: #525252;
  }
`;
