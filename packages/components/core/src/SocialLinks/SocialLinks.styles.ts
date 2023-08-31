/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

export const SocialLinks = styled('div')`
  color: ${props => props.theme.colors.interactive.primary.base.fg};
  display: flex;
  justify-content: center;

  ${props => media.greaterThan(props, 'medium').then(css`
    justify-content: flex-start;
  `)}

  ${props => media.greaterThan(props, 'large').then(css`
    justify-content: flex-end;
    margin-top: 0;
  `)}
`;

export const Icon = styled('button')<{ fgColor: string; bgColor: string }>`
  align-items: center;
  background-color: ${props => props.bgColor};
  border-radius: 50%;
  display: flex;
  height: 2rem !important; /* stylelint-disable-line */
  justify-content: center;
  margin: 0 0 0 0.5rem;
  outline: none;
  width: 2rem !important; /* stylelint-disable-line */

  svg { /* stylelint-disable-line */
    color: ${props => props.fgColor};
    height: 1.1rem;
    width: 1.1rem;
  }

  &:hover,
  &:focus {
    transform: scale(1.1);
    transition: transform 200ms ease-out;
  }
`;
