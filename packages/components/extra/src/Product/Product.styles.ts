/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Product = styled('div')`
  ${props => media.greaterThan(props, 'medium').then(css`
    display: flex;
  `)}
`;

export const Media = styled('div')`
  ${props => media.greaterThan(props, 'medium').then(css`
    background-color: ${props.theme.colors.backgrounds.panels.tertiary.base};
    flex: 0 0 30%;
  `)}
`;

export const Image = styled('img')`
  height: auto;
  max-width: 100%;
  width: 100%;
`;

export const Content = styled('div')`
  flex: 1;
  padding: 2rem;
`;

export const Title = styled('h2')`
  color: ${props => props.theme.colors.brand.brand1.base};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading2)};
`;

export const Section = styled('div')`
  margin: 1rem 0 0;
`;

export const Price = styled('div')`
  color: ${props => props.theme.colors.text.primary};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
  margin: 1rem 0 0;
`;
