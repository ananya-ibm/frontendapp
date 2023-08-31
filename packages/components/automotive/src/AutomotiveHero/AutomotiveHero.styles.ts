/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './AutomotiveHero.theme';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const AutomotiveHero = styled('div')<{ backgroundColor?: string }>`
  background: ${props => props.backgroundColor};
  position: relative;
  text-align: center;
`;

export const Banner = styled('div')`
  max-height: 34.75rem;
  overflow: hidden;
  position: relative;
  text-align: left;
`;

export const Image = styled('div')<{ image?: string }>`
  animation: ${props => props.theme?.motion.entry.slow};
  background: url(${props => props.image}) no-repeat top center;
  background-size: cover;

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
  max-width: 25rem;
  padding: 4.5rem 1rem 4.5rem 8.5rem;

  ${props => media.greaterThan(props, 'medium').then(css`
    left: 0;
    max-width: 38%;
    padding: 5% 1rem 1rem 10%;
    position: absolute;
    top: 0;
    z-index: 1;
  `)}
`;

export const Title = styled('h2')<{ textColor?: string }>`
  color: ${props => props.textColor};
  ${props => responsiveFontBlock(props.theme.typography.display.heading1, { weight: '700' })}
`;

export const Description = styled('p')<{ textColor?: string }>`
  color: ${props => props.textColor};
  ${props => responsiveFontBlock(props.theme.typography.display.body1, { weight: '400' })};
  margin: 1.5rem 0 0;
  max-width: 15rem;
  ${props => media.greaterThan(props, 'large').then(css`
    max-width: 25rem;
  `)}
`;

export const Button = styled('div')`
  color: ${props => theme(props).buttonColor};
  margin: 2.5rem 0 0;

  ${props => media.greaterThan(props, 'medium').then(css`
    margin: 5rem 0 0;
  `)}
`;
