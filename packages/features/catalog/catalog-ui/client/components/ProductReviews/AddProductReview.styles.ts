/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled from 'styled-components';

export const ReviewSummary = styled('div')`
  /* ... */
`;

export const Title = styled('h3')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
  margin-bottom: ${props => props.theme.spacing.stack.s4};
`;

export const Summary = styled('div')`
  align-items: center;
  column-gap: ${props => props.theme.spacing.inline.s4};
  display: flex;
  margin-bottom: ${props => props.theme.spacing.stack.s7};
`;

export const SummaryText = styled('div')``;

export const Details = styled('div')`
  display: flex;
  flex-direction: column;
  row-gap: ${props => props.theme.spacing.stack.s5};
`;

export const Detail = styled('div')`
  align-items: center;
  column-gap: ${props => props.theme.spacing.inline.s3};
  display: flex;
`;

export const ValueLabel = styled('div')`
  min-width: 2.5rem;
  text-align: right;
`;
