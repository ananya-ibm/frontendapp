/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const Wrapper = styled('div')`
  margin-left: auto;
  margin-right: auto;
  max-width: 99rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const Main = styled('div')`
  display: flex;
  flex-direction: column;

  ${props => media.greaterThan(props, 'medium').then(css`
    align-items:flex-start;
    flex-direction:row;
    margin: 1rem;
  `)}
`;

export const Summary = styled('div')`
  ${props => media.greaterThan(props, 'medium').then(css`
    padding: 0 ${props.theme.spacing.inline.s6};
  `)}
`;
