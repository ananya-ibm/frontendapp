/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const DynamicVehicleImage = styled('div')<{ backgroundColour?: string; backgroundImage?: string }>`
  background-color: ${props => `${props.backgroundColour}`};
  background-image: ${props => `url(${props.backgroundImage})`};
  background-repeat: no-repeat;
  background-size: cover;
  height: 0;
  left: 0;
  padding-top: 50%;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const DynamicImage = styled('div')<{ bgImg?: string; percentSize: number }>`
  background-image: ${props => `url(${props.bgImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 0;
  left: ${props => ((100 - props.percentSize) / 2).toString()}%;
  padding-top: 50%;
  position: absolute;
  top: 0;
  width: ${props => `${props.percentSize}%`};
`;
