/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import { Link as ReactLink } from '@exo/frontend-common-link';
import theme from './Header.theme';

export const Header = styled('header')`
  background: ${(props) => theme(props).background};
  border-top: ${(props) => theme(props).borderTop};
  box-shadow: ${(props) => theme(props).boxShadow};
  position: sticky;
  top: var(--top);
  margin-top: var(--top);
  z-index: 5;

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      & .menu-button {
        display: none;
      }
    `)}
`;

export const Content = styled('div')`
  display: flex;
  height: 3.5rem;
  transition: height 300ms ease-out;

  & .logo {
    opacity: 1;
    transition: opacity 200ms ease-out;
  }

  &:hover,
  &:focus {
    & .logo {
      opacity: 0.5;
    }
  }

  &:hover,
  &:focus,
  &:focus-within {
    & .logo {
      opacity: 0.5;

      &:hover,
      &:focus,
      &:focus-within {
        background: ${(props) => theme(props).backgroundHover};
        opacity: 1;
        outline: none;
      }
    }
  }
`;

export const NavLinks = styled('div')`
  margin: auto;
`;

export const Icons = styled('div')`
  align-items: center;
  color: ${(props) => theme(props).iconColor};
  display: flex;
  flex-grow: 1;
  height: 100%;
  justify-content: flex-end;

  & svg {
    color: ${(props) => theme(props).iconColor};
  }
`;

export const Logo = styled(ReactLink)`
  align-items: center;
  color: ${(props) => theme(props).logoColor};
  display: flex;
  justify-content: center;
  padding: 0 0.5rem;

  /* stylelint-disable-next-line selector-max-type */
  & svg,
  & img {
    fill: ${(props) => theme(props).logoColor};
    height: ${(props) => theme(props).logoHeight};
    width: ${(props) => theme(props).logoWidth};
  }
`;
