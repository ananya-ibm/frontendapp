/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const Layout = styled.div`
  display: grid;
  grid-template-areas "title" "price" "images" "extra";
  grid-template-rows: repeat(4, min-content);
  grid-template-columns: 1fr;
  grid-column-gap: 2rem;

  ${props => media.greaterThan(props, 'medium').then(css`
    grid-template-areas "images title" "images price" "images extra";
    grid-template-columns: repeat(2, minmax(0, 1fr));
  `)};
`;

export const Title = styled.div`
  grid-area: title;
`;
export const Price = styled.div`
  grid-area: price;
`;
export const Extra = styled.div`
  grid-area: extra;
  margin-top: 2rem;
  ${props => media.greaterThan(props, 'medium').then(css`
    margin-top: 0;
  `)};
`;
export const Images = styled.div`
  grid-area: images;
`;

