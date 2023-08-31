/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled from 'styled-components';

export const OrderPanel = styled('div')``;

export const PanelTop = styled('div')`
  padding: 1.5rem;
`;

export const PanelTitle = styled('h2')`
  color: ${props => props.theme.colors.link.base};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
  text-transform: uppercase;
`;

export const PanelContent = styled('div')`
  padding: 0 1.5rem 1.5rem 1.5rem;
`;

export const Buttons = styled('div')`
  margin-top: 1.5rem;
`;
