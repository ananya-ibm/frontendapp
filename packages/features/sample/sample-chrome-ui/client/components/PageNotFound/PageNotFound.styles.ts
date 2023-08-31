/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';


export const PageNotFound = styled('div')`
  padding: 20rem;
  text-align: center;

  ${props => media.greaterThan(props, 'medium').then(css`
    padding: 5rem;
    text-align: center;
  `)}
  ${props => media.greaterThan(props, 'small').then(css`
    padding: 5rem;
    text-align: center;
  `)}
`;
