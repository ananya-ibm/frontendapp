/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, {css} from 'styled-components';
import {
    Calendar,
    UserMultiple,
    Plane,
    Time
  } from '@carbon/react/icons';


export const FlightInfoSegment = styled('span')``;

export const InfoIcon = css`
  color: #8d8d8d;
  position: relative;
  bottom: -0.2rem;
  margin-right: 0.3rem;
`;

export const DateIcon = styled(Calendar)`
  ${InfoIcon};
`;
export const PassengersIcon = styled(UserMultiple)`
  ${InfoIcon};
`;
export const PlaneIcon = styled(Plane)`
  ${InfoIcon};
`;
export const TimeIcon = styled(Time)`
  ${InfoIcon};
`;

export const InfoText = styled('span')`
  font-size: small;
  color: #525252;
`;