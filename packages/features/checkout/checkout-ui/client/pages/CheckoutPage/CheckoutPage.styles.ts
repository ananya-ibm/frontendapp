/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const CheckoutPage = styled('div')`
  & .cds--progress-step {
    display: flex;
    padding: 1rem 0;
    width: auto;
    ${props => media.greaterThan(props, 'medium').then(css`
      padding-right: 3.5rem;
    `)}
  }
`;

export const StepContentWrapper = styled.div`
  border: 1px solid #dedede;
  padding: 1rem;
  margin-bottom: 4rem;
`;