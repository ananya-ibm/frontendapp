/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { media } from '@exo/frontend-common-style-utils';
import theme from './Nav.theme';

export const Nav = styled('div')<{ isMenuOpen?: boolean }>`
  height: ${(props) => (props.isMenuOpen ? '100vh' : '0')};
  overflow: hidden;
  position: absolute;
  width: 100%;

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      height: auto;
      overflow: visible;
      position: static;
    `)}
`;
export const Overlay = styled('div')<{ isMenuOpen?: boolean }>`
  background: ${(props) => theme(props).overlayColor};
  height: 100%;
  opacity: ${(props) => (props.isMenuOpen ? 1 : 0)};
  position: absolute;
  transition: opacity 300ms ease-in-out;
  width: 100%;

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      display: none;
    `)}
`;

export const Item = styled('li')`
  height: 100%;
  opacity: 1;
  transition: opacity 200ms ease-out;
  white-space: nowrap;
`;

export const Content = styled('nav')<{ isMenuOpen?: boolean }>`
  border-width: ${(props) => theme(props).borderWidth};
  border-color: ${(props) => theme(props).borderColor};
  border-style: solid;

  background: ${(props) => theme(props).background};
  color: ${(props) => theme(props).linkColor};
  display: flex;
  flex-direction: column;
  /* stylelint-disable */
  height: calc(100% - 48px);
  /* stylelint-enable */
  justify-content: space-between;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: 0;
  transform: ${(props) => (props.isMenuOpen ? 'translateX(0%)' : 'translateX(100%)')};
  transition: transform 300ms ease-in-out;
  width: 15rem;

  &:hover,
  &:focus,
  &:focus-within {
    & ${Item} {
      opacity: 0.65;

      &:hover,
      &:focus,
      &:focus-within {
        opacity: 1;
      }
    }
  }
  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      align-items: center;
      flex-direction: row;
      height: auto;
      overflow: visible;
      position: static;
      transform: none;
      width: 100%;
    `)}
`;

export const Items = styled('ul')`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin-right: 2rem;

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      flex: 1;
      flex-direction: row;
    `)}
`;

export const Link = styled(ReactLink)`
  color: ${(props) => theme(props).linkColor};
  display: block;
  font: ${(props) => theme(props).linkFont};
  padding: ${(props) => theme(props).navPadding};
  text-transform: ${(props) => theme(props).textTransform};

  &:hover,
  &:focus {
    outline: none;
    text-decoration: ${(props) => theme(props).hoverDecoration};
  }
`;

export const Settings = styled('div')`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: ${(props) => props.theme.spacing.inline.s4};

  /* stylelint-disable-next-line selector-max-type */
  button {
    color: ${(props) => props.theme.colors.inverse.base.fg};
  }
`;
