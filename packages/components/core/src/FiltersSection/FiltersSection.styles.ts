/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const FiltersSectionDesktop = styled.div`
  display: none;
  ${(props) => media.greaterThan(props, 'large').then(css`
    display: block;
    position: sticky;
    top: calc(var(--top) + 3rem);
  `)}
`;

export const FiltersSectionMobile = styled.div`
  ${(props) => media.greaterThan(props, 'large').then(css`
    display: none;
  `)}
`;

export const FilterPanel = styled.div`
  padding: 0 2rem;
`;