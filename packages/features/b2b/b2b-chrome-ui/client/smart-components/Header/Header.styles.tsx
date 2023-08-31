/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Link as ReactLink } from '@exo/frontend-common-link';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import styled, { css } from 'styled-components';
import theme from './Nav.theme';

export const Logo = styled(ReactLink)`
  color: white;
  ${(props) => responsiveFontBlock(props.theme.typography.heading.heading2)};
  margin-top: 0.5rem;

  & svg {
    height: 2.5rem;
    width: 7rem;
  }
`;

export const Header = styled('div')`
  background-color: ${(props) => props.theme.colors.brand.brand1.base};
  height: 4rem;
  left: 0;
  padding: 0.8rem 1rem 0.8rem 0.5rem;

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      padding: 0.8rem 2rem 0.8rem 1.5rem;
    `)}

  position: fixed;
  right: 0;
  top: var(--top);
  z-index: 15;
  display: flex;
  align-items: center;

  box-shadow: 0 0 1rem rgb(0, 0, 0, 0.3);
`;

export const Icons = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-top: 0.4rem;
`;

export const Menu = styled.div`
  display: none;
  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      color: white;
      display: flex;
      font-weight: bold;
      gap: 1.5rem;
      margin-left: auto;
    `)}
`;

export const UserIcon = styled.div`
  display: inline-flex;
  height: 100%;
  padding: ${(props) => props.theme.spacing.inset.S};

  /* stylelint-disable-next-line selector-max-type */
  svg {
    color: white;
  }

  /* stylelint-disable-next-line selector-max-type */
  button span {
    margin: 0;
  }

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      margin-right: -0.75rem;
    `)}
`;

export const MenuToggle = styled('div')`
  display: inline-flex;
  height: 100%;
  padding: ${(props) => props.theme.spacing.inset.S};
  margin-right: -0.75rem;

  /* stylelint-disable-next-line selector-max-type */
  svg {
    color: white;
  }

  /* stylelint-disable-next-line selector-max-type */
  button span {
    margin: 0;
  }

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      display: none;
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
