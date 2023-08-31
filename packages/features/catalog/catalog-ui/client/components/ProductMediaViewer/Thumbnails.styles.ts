/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';


export const Container = styled('div')`
  overflow: hidden;
  margin-top: 2rem;
`;

export const Carousel = styled.div`
  display: none;
  ${props => media.greaterThan(props, 'medium').then(css`
    display: grid;
    grid-template-columns: repeat(10, calc(25% - 1.5rem));
    grid-template-rows: 1fr;
    gap: 2rem;
  `)}
`;

export const Thumbnail = styled.div<{ isActive: boolean }>`
  aspect-ratio: 1 / 1;
  border: 1px solid #dedede;
  position: relative;
  ${props => props.isActive ? '' : css`
    img {
      filter: brightness(1.5) saturate(50%);
    }  
  `};
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;