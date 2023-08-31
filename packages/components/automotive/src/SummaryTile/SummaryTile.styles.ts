/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const SummaryTile = styled('div')`
  display: flex;
  height: 6.25rem;
  width: 15rem;
`;
export const Thumbnail = styled('div')<{ image?: string }>`
  background: url(${props => props.image}) no-repeat top center;
  background-size: contain;
  height: 0;
  max-width: 6rem;
  overflow: hidden;
  padding-top: 100%;
  width: 100%;
`;

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 1rem;
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading5, { weight: 400 })};
`;

export const Cost = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const Version = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { weight: 600 })};
  font-style: italic;
`;

export const Text = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { weight: 600 })};
`;
