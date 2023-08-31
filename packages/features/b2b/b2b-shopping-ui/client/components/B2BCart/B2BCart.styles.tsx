/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const Quantity = styled.div`
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

  & .cds--number__control-btn::before,
  .cds--number__control-btn::after {
    width: 0;
  }

  & .cds--number__rule-divider {
    z-index: 9;
  }

  ${props =>
    media.greaterThan(props, 'large').then(css`
      & .cds--number__controls {
        display: flex;
      }
    `)}
`;

export const Actions = styled('div')`
  display: flex;
  gap: 1rem;
`;

export const Delivery = styled('div')`
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  color: #333;
  font-size: 90%;
  margin-bottom: 1.5rem;
`;

export const Wrapper = styled('div')`
  height: 100%;
  padding: 2rem;
  width: 100%;

  /* stylelint-disable-next-line selector-max-type */
  & th {
    background-color: ${props => props.theme.colors.brand.brand1.base};
    color: ${props => props.theme.colors.brand.brand1.contrast};
  }

  & .icon {
    cursor: pointer;
    margin: ${props => props.theme.spacing.stack.s3} 0.9rem 0;
    width: 1.2rem;
  }

  & .icons:hover {
    background-color: ${props => props.theme.colors.backgrounds.panels.primary.hover};
  }
`;

export const Header = styled('div')`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;

  ${props =>
    media.greaterThan(props, 'large').then(css`
      align-items: center;
      flex-direction: row;

      /* stylelint-disable-next-line selector-max-type */
      & > div:last-child {
        margin-left: auto;
      }
    `)}
`;
