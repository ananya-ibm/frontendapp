/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const CreditCheck = styled('div')`
  animation: ${props => props.theme.motion.entry.regular};
  padding: ${props => props.theme.spacing.stack.s10};
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.stack.s6} 0 0;
  width: 100%;
`;

export const TextBlock = styled('div')`
  display: flex;
  justify-content: center;
  margin: ${props => props.theme.spacing.stack.s6} 0 0;
`;
