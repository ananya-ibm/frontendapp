/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const FeaturedItem = styled('div')`
  background-color: ${props => props.theme.colors.inverse.base.bg};
  color: ${props => props.theme.colors.inverse.base.fg};
  display: grid;
  grid-template-columns: 1fr;
  width: calc(100% - 7.5rem);
  ${props => media.greaterThan(props, 'medium').then(css`
    min-height: 40rem;
    padding: 7.5rem 0 7.5rem 6rem;
    position: relative;
  `)}
`;

export const Text = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.display.body1, {}, false)};
  padding-bottom: 1rem;
`;

export const Content = styled('div')`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  height: 100%;
  justify-content: space-evenly;
  line-height: 1.5;
  padding: 2.5rem;
  width: 100%;
  ${Text} {
    margin-top: 1rem;
  }
  ${props => media.greaterThan(props, 'medium').then(css`
    max-width: calc(55% - 7.5rem);
    padding: 0;
    width: calc(55% - 7.5rem);
  `)}
`;

export const Title = styled('h1')`
  text-transform: uppercase;
`;

type ImageProps = { url: string };
export const Image = styled('div')<ImageProps>`
  ${props => media.greaterThan(props, 'medium').then(css`
    background-image: url('${props.url}');
    background-position: center bottom;
    background-size: cover;
    display: block;
    height: 28.5rem;
    position: absolute;
    right: -7.5rem;
    top: 6.25rem;
    width: 60%;
  `)}
`;
