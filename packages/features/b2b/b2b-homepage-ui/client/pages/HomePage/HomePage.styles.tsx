/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { media } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';

export const Panel = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.page};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1), 0 0 1rem rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  width: 100%;

  ${props =>
    media.greaterThan(props, 'medium').then(css`
      width: 35rem;
    `)}
`;
