/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Entry = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
  margin: ${props => props.theme.spacing.stack.s6} ${props => props.theme.spacing.inline.s6} ${props => props.theme.spacing.stack.s6} 0;
`;

export const Distance = styled('div')`
  color: ${props => props.theme.colors.text.tertiary};
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
  font-size: 80%;
  margin-left: 2.5rem;
`;

export const Status = styled.span<{ type?: string }>`
  color: ${props => (props.type === 'available' ? 'green' : 'red')};
  float: right;
`;

export const Radio = styled.span`
  float: left;
  margin-right: ${props => props.theme.spacing.inline.s5};
  width: 1rem;
`;
