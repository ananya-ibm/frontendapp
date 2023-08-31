/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const ContentTile = styled.div`
`;

// TODO: Improve horizontal scrolling behaviour
export const ContentTiles = styled.div<{ tileCount: number }>`
  display: grid;
  gap: 2rem;

  ${props => props.tileCount === 2 && css`
    grid-template-columns: repeat(${props.tileCount}, calc(50% - 1rem));
  `}
  ${props => props.tileCount > 2 && css`
    grid-template-columns: repeat(${props.tileCount}, calc(75% - 1rem));
    margin-right: -1rem;
    margin-left: -1rem;
    scroll-padding-left: 1rem;
    padding: 0 1rem;
  `}

  overflow: scroll;

  ${(props) => media.greaterThan(props, 'medium').then(css`
    grid-template-columns: repeat(${props.tileCount}, minmax(10rem, 1fr));
    padding: 0;
    margin-right: 0;
    margin-left: 0;
    overflow: auto;
  `)}
  

  scroll-snap-type: x mandatory;

  > div {
    scroll-snap-align: start;
  }

  ${(props) => media.lessThan(props, 'large').then(css`
    button {
      padding-right: 1rem;
    }
  `)}
`;


export const Title = styled.h2``;
export const Image = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const Subtitle = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const Body = styled.p`
  margin-bottom: 1rem;
`;

export const CTA = styled.div`
  margin-bottom: 1.5rem;
`;
