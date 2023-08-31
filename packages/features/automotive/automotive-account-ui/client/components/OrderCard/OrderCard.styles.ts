/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const AutoOrderCard = styled('div')``;

export const ThumbnailWrapper = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.tertiary.base};
  height: 100%;
  padding: 1rem;
`;

export const Thumbnail = styled('div')<{ src: string }>`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

export const ProductName = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.emL)};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.stack.s4};
`;

export const LinePrice = styled('span')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
`;
