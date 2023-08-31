/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const OrderHistory = styled('div')`
  margin: ${props => props.theme.spacing.stack.s6} 0 0;
`;

export const Content = styled('div')`
  background: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  flex: 2 1;
  margin-top: ${props => props.theme.spacing.stack.s5};
`;
