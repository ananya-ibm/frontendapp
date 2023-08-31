/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp } from '@exo/frontend-common-style-utils';

export const QuickOrderForm = styled('div')`
  /* ... */
`;

export const Content = styled('div')<{ isActive: boolean }>`
  background: ${props => props.theme.colors.backgrounds.page};
  max-height: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: 200ms all ease-in-out;
  z-index: -1;

  ${props => ifProp(props, 'isActive').then(css`
    max-height: 70vh;
    overflow: auto;
    padding: ${props.theme.spacing.stack.s6} 0 ${props.theme.spacing.stack.s9};
    z-index: 1;
  `)};
`;
