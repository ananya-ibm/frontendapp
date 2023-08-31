/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { ifProp } from '@exo/frontend-common-style-utils';
import theme from './Menu.theme';

export const Menu = styled('div')``;

export const Header = styled('div')`
  align-items: center;
  background: ${props => theme(props).headerBackground};
  display: flex;
  margin: 0.06rem 0;
  padding: ${props => props.theme.spacing.stack.s5} ${props => props.theme.spacing.stack.s6};
`;

export const Title = styled(ReactLink)`
  color: ${props => theme(props).headerColor};
  display: block;
  flex: 1;
  font: 600 ${props => theme(props).menuFontSize} ${props => theme(props).fontFamily}, 'Arial';
  line-height: 1;

  &:hover {
    color: ${props => theme(props).headerColorHover};
  }
`;

export const Icon = styled('button')`
  border: none;
  color: ${props => theme(props).headerColor};
  cursor: pointer;
  flex: 0 0 1.5rem;
  margin: auto 0 auto auto;

  &:hover {
    color: ${props => theme(props).headerColorHover};
  }
`;

export const Content = styled('div')<{ isExpanded?: boolean }>`
  background: ${props => theme(props).menuBgColor};
  display: none;

  ${props =>
    ifProp(props, 'isExpanded').then(css`
      display: block;
    `)}
`;

export const Items = styled('div')``;

export const Link = styled(ReactLink)`
  color: ${props => theme(props).color};
  cursor: pointer;
  display: block;
  font: 700 ${props => theme(props).linkFontSize} ${props => theme(props).fontFamily};
  padding: ${props => props.theme.spacing.stack.s5} ${props => props.theme.spacing.inline.s5}
    ${props => props.theme.spacing.stack.s5} calc(2 * ${props => props.theme.spacing.stack.s6});

  &:hover {
    background: ${props => theme(props).activeBackground};
    color: ${props => theme(props).hoverColor};
  }

  &.isActive {
    background: ${props => theme(props).activeBackground};
    color: ${props => theme(props).activeText};

    &:hover {
      background: ${props => theme(props).activeBackground};
      color: ${props => theme(props).activeText};
    }
  }
`;
