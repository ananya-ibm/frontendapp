/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled from 'styled-components';
import { StarFilled } from '@carbon/react/icons';

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

export const SummaryStars = styled('div')``;
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

export const Graph = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  border-radius: 0.25rem;
  height: ${props => props.theme.spacing.stack.s4};
  margin: 0 ${props => props.theme.spacing.inline.s3};
  position: relative;
  width: 100%;
`;

export const Bar = styled('div')<{ percentage: number }>`
  background-color: ${props => props.theme.colors.brand.brand1.base};
  border-radius: 0.25rem;
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: ${props => props.percentage}%;
`;

export const ValueLabel = styled('div')`
  min-width: 2.5rem;
  text-align: right;
`;

export const Star = styled(StarFilled).attrs(() => ({ size: 20 }))`
  color: ${props => props.theme.colors.icon.primary};
`;

export const StarCount = styled('div')``;
