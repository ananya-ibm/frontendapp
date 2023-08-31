/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled from 'styled-components';
import { Button as ButtonComponent } from '@exo/frontend-components-base';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './Tooltip.theme';

export const Tooltip = styled('div')`
  background: ${props => theme(props).background};
  border-radius: ${props => theme(props).borderRadius};
  color: ${props => theme(props).color};
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  padding: ${props => theme(props).padding};
`;

export const Title = styled('div')`
  color: ${props => theme(props).titleColor};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
`;

export const Content = styled('div')`
`;

export const Footer = styled('div')`
  display: flex;
  gap: 1rem;
  margin-top: ${props => props.theme.spacing.stack.s6};
`;

export const Button = styled(ButtonComponent)`
  align-self: center;
  max-height: ${props => theme(props).buttonMaxHeight};
  min-width: unset;
`;