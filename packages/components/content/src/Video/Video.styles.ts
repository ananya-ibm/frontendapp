/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Video = styled('div')`
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    transparent 50%,
    ${props => props.theme.colors.backgrounds.panels.primary.base} 50%,
    ${props => props.theme.colors.backgrounds.panels.primary.base} 100%
  );
  padding: 2rem 2.5rem 4rem 2rem;
`;

export const Inner = styled('div')`
  margin: 0 auto;
  max-width: 42rem;
  text-align: center;
`;

export const Accent = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { size: '0.7rem' })};
  text-transform: uppercase;
`;

export const Title = styled('h2')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
`;

export const Media = styled('div')`
  display: block;
  margin: 2rem 0;
  width: 100%;
`;
