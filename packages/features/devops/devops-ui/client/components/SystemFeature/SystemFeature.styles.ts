/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Tile } from '@carbon/react';
import styled from 'styled-components';

export const ArchitectureSubComponent = styled(Tile)`
  padding: 1rem;
  background-color: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  border: ${props => props.theme.colors.backgrounds.panels.primary.base};
  margin-bottom: 0.5rem;
`;

export const ArchitectureSubComponentTitle = styled.h6`
`;

export const ArchitectureSubComponentDetail = styled.p`
`;
