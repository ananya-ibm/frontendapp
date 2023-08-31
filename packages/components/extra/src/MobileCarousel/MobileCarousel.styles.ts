/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp, media } from '@exo/frontend-common-style-utils';
import theme from './MobileCarousel.theme';

export const MobileCarousel = styled('div')`
  ${props => media.greaterThan(props, 'medium').then(css`
    display: none;
  `)}
`;

export const Progress = styled('div')`
  display: flex;
  justify-content: center;
  padding: ${props => theme(props).progressPadding};
`;

export const Dot = styled('div')`
  background: ${props => theme(props).dotColor};
  border-radius: 50%;
  cursor: pointer;
  height: 60%;
  width: 60%;
`;

export const Button = styled('button')<{ isCurrent?: boolean }>`
  background: transparent;
  border: 0 none;
  cursor: pointer;
  height: ${props => theme(props).buttonSize};
  opacity: 0.4;
  transition: 200ms opacity ease-in;
  width: ${props => theme(props).buttonSize};
  z-index: 3;

  ${props => ifProp(props, 'isCurrent').then(css`
    opacity: 1;

    ${Dot} {
      background-color: ${theme(props).dotActiveColor};
    }
  `)}

  &:hover, &:focus {
    outline: none;
  }
`;
