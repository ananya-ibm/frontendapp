/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp } from '@exo/frontend-common-style-utils';

export const ShippingDetails = styled('div')`
  animation: ${props => props.theme.motion.entry.regular};
  padding: ${props => props.theme.spacing.stack.s10};
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.stack.s6} 0 0;
  width: 100%;
`;

export const Expander = styled('div')`
  margin: ${props => props.theme.spacing.stack.s7} 0;
`;

export const ExpanderContent = styled('div')<{ isExpanded?: boolean }>`
  max-height: 0;
  overflow: hidden;
  transition: 200ms all ease-in-out;

  ${props => ifProp(props, 'isExpanded').then(css`
    max-height: 29rem;
  `)}
`;
