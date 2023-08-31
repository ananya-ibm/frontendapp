/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const ProductItemCarousel = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Carousel = styled.div`
  display: grid;
  gap: 2rem;

  margin-right: -1rem;
  margin-left: -1rem;
  scroll-padding-left: 1rem;
  padding: 0 1rem;

  grid-template-columns: repeat(4, 40%); 
  ${(props) => media.greaterThan(props, 'medium').then(css`
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
    margin-right: 0;
    margin-left: 0;
  `)}
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  > div {
    scroll-snap-align: start;
  }
`;

export const CTA = styled.div`
  align-self: center;
`;

