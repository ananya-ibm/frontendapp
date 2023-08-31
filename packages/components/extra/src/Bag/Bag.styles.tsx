/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Bag = styled(ReactLink)<{ to: string }>`
  align-items: center;
  color: ${props => props.theme.colors.brand.brand1.base};
  display: flex;
  text-decoration: none;
`;

export const Inner = styled('div')`
  color: ${props => props.theme.colors.icon.primary};
  height: ${props => props.theme.spacing.stack.s6};
  padding: ${props => props.theme.spacing.stack.s2} 0 0 ${props => props.theme.spacing.inline.s3};
  position: relative;
  width: ${props => props.theme.spacing.inline.s6};
`;

export const Icon = styled('div')`
  width: ${props => props.theme.spacing.inline.s6};
`;

export const Qty = styled('div')`
  align-items: center;
  background-color: ${props => props.theme.colors.brand.brand1.base};
  border-radius: 100%;
  color: ${props => props.theme.colors.inverse.base.fg};
  display: inline-flex;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { size: '0.625rem' })};
  height: ${props => props.theme.spacing.stack.s6};
  justify-content: center;
  position: absolute;
  right: -1.25rem;
  top: -${props => props.theme.spacing.stack.s3};
  width: ${props => props.theme.spacing.inline.s6};
`;
