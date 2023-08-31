/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const ProductReviews = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${props => media.greaterThan(props, 'large').then(css`
    flex-direction: row;
  `)}
`;

export const ReviewSummary = styled('div')`
    flex-basis: 40%;
`;

export const ReviewList = styled('div')`
    flex-basis: 60%;
    ${props => media.greaterThan(props, 'large').then(css`
      margin-top: 3rem;
    `)}
`;
