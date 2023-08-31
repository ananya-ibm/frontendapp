/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const Cart = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${props => media.greaterThan(props, 'medium').then(css`
    flex-direction: row;
  `)}
`;

export const StickyColumn = styled('div')`
  flex: 0 0 70%;
  position: relative;

  ${props => media.greaterThan(props, 'medium').then(css`
    align-self: flex-start;
    border-right: solid 0.0625rem #dcdcdc;
    position: sticky;
    top: 5rem;
  `)}
`;

export const StickyBottom = styled('div')`
  align-self: flex-start;
  background-color: ${props => props.theme.colors.backgrounds.page};
  bottom: 0;
  padding: 1rem 0;
  position: sticky;
  width: 100%;
  margin-bottom: 3rem;

  &:before {
    border-bottom: solid 0.0625rem ${props => props.theme.colors.delimiters.lowContrast};
    bottom: 100%;
    content: '';
    height: 5rem;
    pointer-events: none;
    position: absolute;
    width: 100%;
  }

  ${props => media.greaterThan(props, 'medium').then(css`
    &:before {
      display: none;
    }
  `)}

  button {
    width: 100%;
    max-width: 100%;
  }
`;

export const CartColumn = styled('div')`
  border-top: solid 0.0625rem ${props => props.theme.colors.delimiters.lowContrast};
  flex: 0 0 30%;

  ${props => media.greaterThan(props, 'medium').then(css`
    align-self: flex-start;
    border-top: none;
    display:flex;
    flex-direction:column;
    padding-left: 3rem;
    position: sticky;
    top: 5rem;
  `)}
`;

export const SubtotalDelivery = styled('div')`
  display: flex;
  flex-direction: column;
`;
