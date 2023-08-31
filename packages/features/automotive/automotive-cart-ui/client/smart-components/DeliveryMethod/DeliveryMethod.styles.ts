/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const DeliveryMethod = styled('div')`
  animation: ${props => props.theme.motion.entry.regular};
  padding: ${props => props.theme.spacing.inline.s10};

  & .copy {
    ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
    margin: ${props => props.theme.spacing.stack.s7} 0 0;

    &:not(:first-of-type) {
      margin: ${props => props.theme.spacing.stack.s4} 0 0;
    }
  }
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.stack.s10} 0 0;
  width: 100%;
`;
