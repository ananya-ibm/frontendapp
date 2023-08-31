/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './QuickOrder.theme';

export const QuickOrder = styled('div')`
  color: ${props => props.theme.colors.text.primary};
`;

export const Body = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin: ${props => props.theme.spacing.stack.s5} 0;
`;

export const Table = styled('table')`
  background: ${props => theme(props).tableBg};
  margin: ${props => props.theme.spacing.stack.s6} 0;
  table-layout: auto;
  text-align: left;
  width: 100%;
`;

export const Th = styled('th')`
  background: ${props => theme(props).tableHeadBg};
  color: ${props => theme(props).tableHeadText};
  padding: ${props => props.theme.spacing.inset.M};
`;

export const Td = styled('td')`
  box-shadow: inset 0 -0.06rem 0.06rem ${props => theme(props).tableBorder}, inset 0 0 0 transparent;
  padding: ${props => props.theme.spacing.inset.M};
  vertical-align: middle;
`;

export const Product = styled('div')`
  display: flex;
`;

export const Image = styled('img')`
  flex: 0 0 50%;
  height: auto;
  max-height: ${props => props.theme.spacing.stack.s10};
  max-width: ${props => props.theme.spacing.inline.s10};
`;

export const Name = styled('h3')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.emM)};
  margin: ${props => props.theme.spacing.stack.s3} 0 0 ${props => props.theme.spacing.inline.s3};
`;

export const Loading = styled('div')`
  align-items: center;
  display: flex;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin: ${props => props.theme.spacing.stack.s3} 0;
`;
