/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './Modal.theme';

export const Modal = styled('div')<{ isScrollable?: boolean }>`
  & .cds--modal.is-visible {
    background-color: ${props => theme(props).overlay};
  }

  .cds--modal-container {
    background: ${props => theme(props).background};
    max-width: 90%;
    min-width: 60%;
    width: auto;
    ${props => !props.isScrollable && 'overflow: visible;'}
  }

  ${props => media.lessThan(props, 'medium').then(css`
    .cds--modal-container {
      min-width: 100vw;
    }
  `)}

  & .cds--modal-container .cds--modal-content {
    padding-right: 2rem;
    width: 100%;
    ${props => !props.isScrollable && 'overflow: visible;'}
  }

  & .cds--modal-header__heading {
    font: ${props => theme(props).titleFont};
  }

  & .cds--modal .cds--text-input,
  & .cds--modal .cds--dropdown,
  & .cds--modal .cds--select-input {
    background: ${props => theme(props).formElementBackground};
  }
`;
