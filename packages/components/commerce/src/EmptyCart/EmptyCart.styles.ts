/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const EmptyCart = styled('div')`
  align-items: center;
  display: flex;
  flex-flow: column;
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4, { weight: 700 })};
  padding-bottom: ${props => props.theme.spacing.stack.s5};
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-evenly;
  width: 50%;
`;
