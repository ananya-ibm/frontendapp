/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './ProductHero.theme';

export const ProductHero = styled('div')`
  background: ${props => props.theme.colors.brand.brand2};
  position: relative;
  text-align: center;
`;

export const Banner = styled('div')`
  max-height: 34.75rem;
  overflow: hidden;
  position: relative;
  text-align: left;
`;

export const Image = styled('div')<{ image: string; alt: string }>`
  animation: ${props => props.theme.motion.entry.regular};
  background: url(${props => props.image}) no-repeat top center;
  background-position-x: right;
  background-size: cover;
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  width: 100%;

  /* screen width is greater than 768px (medium) */
  ${props => media.greaterThan(props, 'medium').then(css`
    background-position-x: right;
    height: 0;
    overflow: hidden;
    padding-top: 56.25%;
    width: 100%;
  `)}

  ${props => media.greaterThan(props, 'large').then(css`
    background-size: cover;
    padding-top: 46.25%;
  `)}
`;

export const Content = styled('div')`
  background-color: ${props => theme(props).contentBackground};
  height: 100%;
  padding: 1rem 1rem 2rem 2rem;
  width: 100%;

  ${props => media.greaterThan(props, 'medium').then(css`
    left: 0;
    max-width: 38%;
    padding: 5% 1rem 1rem 2.5rem;
    position: absolute;
    top: 0;
    z-index: 1;
  `)}
`;

export const Title = styled('h2')`
  color: ${props => props.theme.colors.inverse.base.fg};
  ${props => responsiveFontBlock(props.theme.typography.display.heading1)};
`;

export const Description = styled('p')`
  color: ${props => props.theme.colors.inverse.base.fg};
  ${props => responsiveFontBlock(props.theme.typography.display.body1)};
  margin: 1.5rem 0 0;

  ${props => media.greaterThan(props, 'medium').then(css`
    max-width: 15rem;
  `)}
`;
