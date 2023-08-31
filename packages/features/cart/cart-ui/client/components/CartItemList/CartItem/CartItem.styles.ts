/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './CartItem.theme';

export const CartItem = styled('li')`
  border: solid 0.0625rem ${props => theme(props).border};
  padding: 1rem;

  display: grid;
  row-gap: 0.5rem;
  column-gap: 1rem;
  grid-template-areas: "thumbnail title" "thumbnail props" ".price" ". links";
  grid-template-columns: minmax(0, min-content) minmax(0, 1fr);

  ${props => media.greaterThan(props, 'large').then(css`
    grid-template-areas: "thumbnail title price" "thumbnail props links";
    grid-template-columns: minmax(0, min-content) minmax(0, 1fr);
  `)}
`;

export const Thumbnail = styled.div`
  grid-area: thumbnail;
  img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    overflow: hidden;
    border: 1px solid #dedede;
  }
`;

export const Title = styled.div`
  grid-area: title;
`;

export const Links = styled.div`
  grid-area: links;
  justify-self: end;
  align-self: end;

  a {
    text-decoration: none;
    font-weight: 400;
  }
`;

export const Props = styled.div`
  grid-area: props;

  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, minmax(3rem, 30%));
`;

export const PropLabel = styled.label`
  ${props => responsiveFontBlock(props.theme.typography.labels.label)};
  color: ${props => props.theme.colors.text.secondary};
`;

export const Price = styled.div`
  grid-area: price;
  justify-self: end;
`;

export const Name = styled.p``;

export const Partnumber = styled.p`
  color: ${props => props.theme.colors.text.secondary};
`;

export const PricePerItem = styled.div`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  color: ${props => props.theme.colors.text.secondary};
  text-align: right;
`;

export const TotalPrice = styled.div`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  font-weight: 600;
  text-align: right;
`;