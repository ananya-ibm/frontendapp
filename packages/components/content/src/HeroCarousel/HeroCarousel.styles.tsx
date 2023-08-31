/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import styled, { css } from 'styled-components';
import { ifProp, media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import { Link as ReactLink } from '@exo/frontend-common-link';
import theme from './HeroCarousel.theme';

export const HeroCarousel = styled('div')<{ containerHeight?: string }>`
  height: 32rem;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      height: 35rem;
    `)}
  ${props =>
    media.greaterThan(props, 'large').then(css`
      height: 40rem;
    `)} 
  ${props =>
    media.greaterThan(props, 'xLarge').then(css`
      height: 50rem;
    `)} 
  position: relative;
`;

export const Items = styled('div')`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Content = styled('div')`
  background: ${props => theme(props).contentBg};
  bottom: ${props => props.theme.spacing.stack.s7};
  color: ${props => theme(props).contentColor};
  display: flex;
  margin: ${props => props.theme.spacing.inset.XL};
  position: absolute;
  transition: 500ms transform cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 3;

  ${props =>
    media.greaterThan(props, 'medium').then(css`
      margin: 0;
      min-height: 50%;
      right: 0;
      width: 50%;
    `)}
`;

export const Background = styled('div')<{ image?: string }>`
  background: ${props => `url(${props.image})`} no-repeat center bottom;
  background-size: cover;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: 500ms all cubic-bezier(0.23, 1, 0.32, 1);
  width: 100%;
  z-index: 1;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      height: calc(100% - ${props.theme.spacing.inline.s10});
      width: calc(100% - ${props.theme.spacing.inline.s9});
    `)}
`;

export const Item = styled(({ zIndex, isCurrent, ...rest }) => <ReactLink {...rest} />)<{
  zIndex?: string;
  isCurrent?: boolean;
}>`
  background: ${props => theme(props).background};
  display: flex;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  transition: 300ms opacity cubic-bezier(0.23, 1, 0.32, 1);
  width: 100%;
  ${props =>
    ifProp(props, 'isCurrent').then(css`
      opacity: 1;
      z-index: ${props.zIndex};
    `)}

  ${props =>
    media.greaterThan(props, 'medium').then(css`
      height: 100%;

      &:hover,
      &:focus {
        ${Background} {
          transform: translate(0.25rem, 0.25rem);
        }
        ${Content} {
          transform: translate(-0.25rem, -0.25rem);
        }
      }
    `)};
`;

export const Foreground = styled('div')<{ image?: string }>`
  background: ${props => `url(${props.image})`} no-repeat center bottom;
  background-size: contain;
  bottom: 50%;
  height: 100%;
  left: 5%;
  position: absolute;
  width: 80%;
  z-index: 4;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      bottom: 3rem;
      height: 100%;
      width: 50%;
    `)}
`;

export const Inner = styled('div')`
  margin: auto;
  padding: ${props => props.theme.spacing.inset.XL};
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      padding: ${props.theme.spacing.stack.s9};
    `)}
`;

export const Title = styled('h2')`
  ${props => responsiveFontBlock(props.theme.typography.display.body1, { weight: 700 })};
`;

export const Body = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.display.body1)};
  line-height: 1.75;
  margin: ${props => props.theme.spacing.stack.s5} 0 0;
  max-width: 25rem;
`;

export const Progress = styled('div')`
  bottom: 1rem;
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.spacing.stack.s3} ${props => props.theme.spacing.inline.s5};
  position: absolute;
  width: 100%;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      bottom: 1rem;
      justify-content: flex-start;
    `)}
`;

export const Dot = styled('div')`
  background: ${props => theme(props).dotColor1};
  border-radius: 50%;
  box-shadow: 0.25rem 0.25rem 1rem ${props => props.theme.colors.delimiters.highContrast},
    -0.25rem -0.25rem 1rem ${props => props.theme.colors.delimiters.highContrast};
  cursor: pointer;
  height: 60%;
  margin: auto;
  width: 60%;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      background: ${theme(props).dotColor2};
      box-shadow: none;
    `)}
`;

export const Button = styled('button')<{ isCurrent: boolean }>`
  background: transparent;
  border: 0 none;
  cursor: pointer;
  display: flex;
  height: 2rem;
  opacity: 0.4;
  transition: 200ms opacity ease-in;
  width: 2rem;
  z-index: 3;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      height: 1.25rem;
      width: 1.25rem;
    `)}

  ${props =>
    ifProp(props, 'isCurrent').then(css`
      opacity: 1;

      ${Dot} {
        background-color: ${theme(props).dotColorActive};
      }
    `)}

  &:hover, &:focus {
    opacity: 0.9;
    outline: none;
  }
`;
