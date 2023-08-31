/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const UsersGrid = styled('div')`
  display: flex;
  flex-direction: column;
  ${props =>
    media.greaterThan(props, 'medium').then(css`
      flex-direction: row;
    `)}
`;

export const UsersAdd = styled('div')`
  padding-top: ${props => props.theme.spacing.stack.s9};
`;
