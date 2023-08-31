/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const WishlistPage = styled.ul`
  /* stylelint-disable-next-line */
  li:last-child {
    border-bottom: none;
  }
`;
export const StickyColumn = styled('div')`
  flex: 0 0 70%;
  position: relative;
  ${props => media.greaterThan(props, 'medium').then(css`
    align-self: flex-start;
    border-right: solid 0.0625rem #DCDCDC;
    position: sticky;
    top: 5rem;
  `)}
`;
export const Button = styled.div`
  display: flex;
  gap: 0.25rem;
  justify-content: flex-end;
  ${props => media.lessThan(props, 'medium').then(css`
    flex: 0 0 100%;
  `)};
`;
