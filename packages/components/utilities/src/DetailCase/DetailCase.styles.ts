/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';
import theme from './DetailCase.theme';

export const Content = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1rem 1rem 0;
`;

export const DetailCase = styled.div<{ imagePosition: 'left' | 'right'; color?: string; background?: string }>`
  /* border: ${props => theme(props).border}; */
  padding: 1rem; background: ${props => props.background ?? props.theme.colors.backgrounds.panels.primary.base};
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  ${props => props.color && css`
    ${Content} > * {
      color: ${props.color};
    }
  `}

  ${props => props.imagePosition === 'left' && css`
    grid-template-areas: "image content";
    ${Content} {
      padding-right: 1rem;
      ${media.greaterThan(props, 'medium').then(css`
        padding-right: 2rem;
      `)}
    }
  `}
  ${props => props.imagePosition === 'right' && css`
    grid-template-areas: "content image";
    ${Content} {
      padding-left: 1rem;
      ${media.greaterThan(props, 'medium').then(css`
        padding-left: 4rem;
      `)}
    }
  `}

  margin: 0 -1rem;
  ${props => media.greaterThan(props, 'medium').then(css`
    margin: 0 -2rem;
  `)}
`;

export const Image = styled.div`
  grid-area: image;
  width: 100%;
  overflow: hidden;
  padding-right: 4rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
`;



export const Subtitle = styled.h2`
  /* color: ${props => props.theme.colors.text.primary}; */
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  margin-bottom: 1rem;
`;

export const Body = styled.p`
  ${props => responsiveFontBlock(props.theme.typography.body.short.S)};
  margin-bottom: 0.5rem;
`;

export const CTA = styled.div`
  display: none;
  ${props => media.greaterThan(props, 'medium').then(css`
    display: block;
  `)}
`;

export const CTAMobile = styled.div`
  display: block;
  ${props => media.greaterThan(props, 'medium').then(css`
    display: none;
  `)}
`;


