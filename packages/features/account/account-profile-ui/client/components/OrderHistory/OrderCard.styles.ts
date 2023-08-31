/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

export const OrderCard = styled('div')``;

export const ThumbnailWrapper = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.tertiary.base};
  height: 100%;
  padding: 1rem;
`;

export const PriceTable = styled('div')`
  border-top: 0.125rem solid ${props => props.theme.colors.delimiters.lowContrast};
  margin-top: ${props => props.theme.spacing.stack.s7};
  padding-top: ${props => props.theme.spacing.stack.s5};
`;

export const MetaData = styled('div')`
  margin-bottom: ${props => props.theme.spacing.stack.s3};
`;

export const Thumbnail = styled('img')<{ src?: string }>`
  background-image: url(${props => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`;

export const InteractiveText = styled('span')`
  color: ${props => props.theme.colors.interactive.primary.base.bg};
`;
