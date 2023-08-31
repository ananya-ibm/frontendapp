/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './Hero.theme';

export const Hero = styled('div')<{ bgImg?: string; bgColor?: string }>`
  align-items: center;
  background-color: ${props => props.bgColor ?? props.theme.colors.backgrounds.panels.primary.base};
  ${props => props.bgImg && css`
    background-image: ${`url(${props.bgImg})`};
    background-position: 40%;
    background-size: cover;
  `}
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 25rem;
  max-height: 33rem;

  ${props => media.greaterThan(props, 'medium').then(css`
    align-items: flex-start;
    background-position: center;
    font-size: 1rem;
    height: 60rem;
    justify-content: flex-end;
  `)}
`;

export const Content = styled('div')<{ c?: string }>`
  color: ${props => props.c || theme(props).color};
  height: 25rem;
  ${props => media.greaterThan(props, 'medium').then(css`
    height: initial;
    width: 50%;
  `)}
  background: ${props => theme(props).content__background};
  padding: 2rem 2rem 2rem 0;
  align-self: end;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`; 

export const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: var(--max-width);
  padding: 0 1rem;
  ${props => media.greaterThan(props, 'medium').then(css`
    padding: 0 2rem;

    /* For some odd reason, the columns are 1rem narrower 
       This might be a carbon bug...
    */
    @media not all and (min-resolution:.001dpcm) { 
      @supports (-webkit-appearance:none) and (stroke-color:transparent) {
        max-width: calc(var(--max-width) - 1rem);
      }
    }
  `)}
  margin: 0 auto;
  display: flex;
`;

export const Image = styled.div`
  position: absolute;
  right: 0;
  height: 25rem;
  width: 100%;
  overflow: hidden;

  ${props => media.greaterThan(props, 'medium').then(css`
    position: relative;
    width: 50%;
    height: 100%;
  `)}

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const Small = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const Title = styled('h1')`
  ${props => responsiveFontBlock(props.theme.typography.display.heading4)};
  padding: 0.5rem 0;
`;

export const Text = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  padding: 1rem 0 2rem;
`;
