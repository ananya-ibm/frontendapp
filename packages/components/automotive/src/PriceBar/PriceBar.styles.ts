/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { responsiveFontBlock, media } from '@exo/frontend-common-style-utils';
import theme from './PriceBar.theme';

export const PriceBar = styled('div')`
  padding: 1.75rem ${props => props.theme.spacing.stack.s6};
  width: 100%;
  ${props => media.greaterThan(props, 'medium').then(css`
    margin: 0 auto;
    padding: ${props.theme.spacing.inset.L};
  `)}
`;

export const Actions = styled('div')`
  text-align: left;
  width: 100%;
  ${props => media.greaterThan(props, 'medium').then(css`
    align-items: center;
    display: inline-flex;
    justify-content: space-between;
  `)}
`;

export const Price = styled('div')`
  & .prefix {
    margin: auto ${props => props.theme.spacing.inline.s2} auto 0;
  }

  & .currencySymbol,
  & .value,
  & .rate {
    color: ${props => theme(props).text};
    font: 600 1.875rem/2.25rem 'IBM Plex Sans', Arial, sans-serif;
  }

  & .value,
  & .rate {
    margin: auto 0;
  }

  ${props => media.greaterThan(props, 'medium').then(css`
    align-items: center;
    display: inline-flex;
    justify-content: flex-start;
  `)}
`;

export const ButtonGroup = styled('div')`
  align-items: center;
  display: inline-flex;
  gap: ${props => props.theme.spacing.inline.s5};
  margin: ${props => props.theme.spacing.stack.s5} auto 0;

  ${props => media.greaterThan(props, 'medium').then(css`
    margin-left: 0 0 0 auto;
  `)}
`;

export const Cost = styled('div')`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.inline.s3};
`;

export const Text = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
`;

export const ConfigurationId = styled('h6')`
  padding-left: ${props => props.theme.spacing.inline.s3};
  padding-top: ${props => props.theme.spacing.stack.s4};
  text-align: left;
`;
