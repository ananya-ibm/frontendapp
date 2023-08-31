/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './ProductGrid.theme';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const ProductGrid = styled('ul')`
  display: grid;

  gap: 0.5rem;
  ${(props) => media.greaterThan(props, 'large').then(css`
    gap: ${theme(props).gap};
  `)}
  list-style: none;

  grid-template-columns: 1fr 1fr;
  ${(props) => media.greaterThan(props, 'medium').then(css`
    grid-template-columns: 1fr 1fr;
  `)}
  ${(props) => media.greaterThan(props, 'large').then(css`
    grid-template-columns: 1fr 1fr 1fr;
  `)}
`;

export const Item = styled('li')`
  /* stylelint-disable selector-max-universal */
  > * {
    height: 100%;
  }
`;

export const PaginationWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${props => media.greaterThan(props, 'medium').then(css`
    margin: 0rem 0rem 2rem 0rem;
  `)}
`;

export const PageSummaryText = styled.p`
  padding-right: 1rem;
`;

export const Actions = styled('div')`
  margin-top: 1.5rem;
  width: 100%;
`;

export const Summary = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin-top: 2rem;
  width: 100%;
`;
