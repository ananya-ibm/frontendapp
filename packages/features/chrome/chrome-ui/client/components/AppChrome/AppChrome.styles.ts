/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { Content } from '@carbon/react';
import { media } from '@exo/frontend-common-style-utils';

export const Main = styled(Content)<{ hasnavigation: string }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  
  ${props => props.hasnavigation === 'true' ? 
    media.greaterThan(props, 'large').then(css`
      left: 256px;
    `) : ''}
`;

export const App = styled.div`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const Notifications = styled('div')`
  max-height: 100vh;
  overflow: auto;
  position: absolute;
  right: 0;
  width: 100%;
  z-index: 5;
`;
