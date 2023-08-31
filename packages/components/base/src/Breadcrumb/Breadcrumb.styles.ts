/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { Breadcrumb as CarbonBreadcrumb } from '@carbon/react';
import { media } from '@exo/frontend-common-style-utils';
import theme from './Breadcrumb.theme';

export const StyledCarbonBreadcrumb = styled(CarbonBreadcrumb)`
  display: none;
  text-transform: capitalize;

  .cds--breadcrumb-item {
    display: none;
  }
  margin-bottom: ${props => props.theme.spacing.stack.s6};

  ${props => media.greaterThan(props, 'medium').then(css`
    display: block;
    margin-bottom: ${props.theme.spacing.stack.s7};

    & .cds--breadcrumb-item {
      display: inline;
    }
  `)};

  ${props => media.lessThan(props, 'medium').then(css`
    display: block;

    & .cds--breadcrumb-item:nth-last-child(2) {
      display: inline;

      &::after {
        content: '';
      }

      &::before {
        color: ${theme(props).slashColor};
        content: '<';
        margin-right: ${props.theme.spacing.inline.s3};
      }
    }
  `)};
`;
