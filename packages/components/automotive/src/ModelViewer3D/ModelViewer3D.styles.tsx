/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled /* , { css } */ from 'styled-components';
import { Button } from '@exo/frontend-components-base'

export const ModelViewer3D = styled('div')`
  cursor: pointer;
  height: 30rem;
  position: absolute;
  top: 5rem;
  width: 70%;
  z-index: 20;
`;

export const VRButton = styled(Button)`
  bottom: 0;
  position: absolute;
  right: 0;
  z-index: 1;
`;
