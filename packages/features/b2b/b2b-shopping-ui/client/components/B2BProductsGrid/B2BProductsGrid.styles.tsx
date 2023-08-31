/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const Price = styled('div')`
  margin-top: -1rem;

  & .price-list,
  & .price-offer {
    display: inline;
  }

  & .price-list {
    padding-right: 0.5rem;
  }
`;

export const PaginationWrapper = styled('div')`
  /* stylelint-disable-next-line selector-max-type */
  & .cds--pagination__left > label {
    display: none;
  }

  & .cds--form-item {
    display: none;
  }

  & .cds--pagination__right .cds--pagination__text {
    display: none;
  }
`;

export const AddToCart = styled('div')`
  display: flex;

  & .cds--number__controls {
    display: none;
  }

  /* stylelint-disable-next-line selector-max-type */
  & .cds--number input {
    /* stylelint-disable-next-line declaration-no-important */
    min-width: 2rem !important;
    /* stylelint-disable-next-line declaration-no-important */
    padding-right: 1rem !important;
  }

  ${props =>
    media.greaterThan(props, 'large').then(css`
      & .cds--number__controls {
        display: flex;
      }
    `)}
`;
