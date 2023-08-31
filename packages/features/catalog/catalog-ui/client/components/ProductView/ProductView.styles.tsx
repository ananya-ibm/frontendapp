/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Header = styled.div`
  display: grid;
  width: 100%;
  margin-top: -1.25rem;
  ${props => media.greaterThan(props, 'large').then(css`
    margin-top: -1.85rem;
  `)}

  grid-template-areas: "filters sort" 
    "count count";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;

  ${(props) => media.greaterThan(props, 'large').then(css`
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "count filters sort";
    grid-template-rows: auto;
  `)}

  ${(props) => media.greaterThan(props, 'large').then(css`
    gap: 2rem;
  `)}

  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const ItemCount = styled.div`
  grid-area: count;
  align-self: end;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  padding: 0;
`;

export const Filters = styled.div`
  grid-area: filters;
  align-self: end;
  button {
    width: 100%;
    max-width: 100%;
  }
  ${(props) => media.greaterThan(props, 'large').then(css`
    display: none;
  `)}
`;

export const Sort = styled.div`
  grid-area: sort;
`;