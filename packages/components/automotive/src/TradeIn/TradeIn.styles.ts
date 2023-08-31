/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const TradeIn = styled('div')`
  background: #fff;
  height: fit-content;
  padding: ${props => props.theme.spacing.inset.XL};
`;

export const Text = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin-top: ${props => props.theme.spacing.stack.s6};
`;

export const BoldText = styled('div')`
  display: inline;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { weight: 700 })};
  margin-left: 0.2rem;
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3, { weight: 700 })};
`;

export const HeaderSection = styled('div')`
  display: flex;
  justify-content: space-between;
`;

export const FooterSection = styled('div')`
  margin-top: ${props => props.theme.spacing.stack.s6};
`;

export const Content = styled('div')`
  margin-top: ${props => props.theme.spacing.stack.s6};
`;
