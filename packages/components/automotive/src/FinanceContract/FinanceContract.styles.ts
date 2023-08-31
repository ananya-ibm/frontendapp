/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const FinanceContract = styled('div')`
  max-width: 37.5rem;
`;

export const Link = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin: ${props => props.theme.spacing.stack.s3} 0 0;
`;

export const Par = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin: ${props => props.theme.spacing.stack.s7} 0 0;
`;

export const Selected = styled('span')`
  font-weight: 700;
`;

export const Table = styled('div')`
  margin: ${props => props.theme.spacing.stack.s7} 0 0;
`;
