/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';

import { SkeletonLine } from '@exo/frontend-components-core';

export const CheckoutPage = styled('div')`
  & .title {
    text-align: center;
  }

  & .main {
    margin-top: ${props => props.theme.spacing.stack.sXXXL};
    width:100%;
  }

  & .cds--progress {
    align-items: center;
    justify-content: center;
  }

  & .cds--progress-step {
    display: flex;
    padding-right: 3.5rem;
    width: auto;
  }

  & .cds--progress-line {
    width: 100%;
  }

  & .cds--progress-label {
    max-width: none;
    overflow: visible;
    white-space: normal;
  }
`;

export const Skeleton = styled(SkeletonLine)`
  min-height: 100vh;
  width: 100%;
`;
