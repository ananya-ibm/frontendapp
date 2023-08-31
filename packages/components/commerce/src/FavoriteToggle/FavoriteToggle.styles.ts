/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';

const size = '2rem';

export const Icon = styled.svg`
  cursor: pointer;
  height: ${size};
  transform: scale(0.75);
  transition: fill 200ms ease-out, stroke 200ms ease-out,
    transform 300ms cubic-bezier(0.3, 3, 0.7, 1);
  width: ${size};
`;

export const Label = styled.label`
  display: grid;
  height: 3rem;
  left: 0;
  place-items: center;
  position: absolute;
  top: 0;
  width: 3rem;

  &:hover {
    & ${Icon} {
      transform: scale(0.875);
    }
  }

  ${props => media.lessThan(props, 'small').then(css`
    left:-0.25rem;
    top:0.75rem;
    & ${Icon} {
      height: 1.5rem; 
      width: 1.5rem;
    }
  `)}
`;

export const ScreenReaderText = styled.span`
  left: -1000rem;
  position: absolute;
`;

export const Input = styled.input`
  display: none;

  &:checked {
    & ~ ${Icon} {
      fill: ${props => props.theme.colors.information.error};
      stroke: ${props => props.theme.colors.information.error};
      transform: scale(1);
    }
  }
`;
