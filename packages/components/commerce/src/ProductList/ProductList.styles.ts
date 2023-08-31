/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { keyframes, css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

const fadeIn = keyframes`
  from {
    opacity: .5;
  }

  to {
    opacity: 1;
  }
`;

export const ProductList = styled('ul')`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

export const Item = styled('li')`
  animation: ${fadeIn} 200ms linear forwards;
`;

export const PaginationWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.delimiters.primary};
  ${props => media.greaterThan(props, 'medium').then(css`
    /* screen width is greater than 768px (medium) */
    margin: 0rem 0rem 2rem 0rem;
  `)}
`;

export const PageSummaryText = styled.p`
  padding-right: 1rem;
`;

export const Actions = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
`;
