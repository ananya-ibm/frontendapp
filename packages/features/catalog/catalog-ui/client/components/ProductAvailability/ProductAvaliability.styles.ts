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
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin-bottom: 0.5rem;
`;

/* eslint-disable no-nested-ternary */
export const Status = styled('span')<{ type: string }>`
  color: ${props =>
    props.type === 'available' ? 'green' : props.type === 'future' ? 'orange' : 'red'};
  float: right;
`;

export const Icon = styled('span')`
  float: left;
  margin-right: ${props => props.theme.spacing.inline.s6};
`;
