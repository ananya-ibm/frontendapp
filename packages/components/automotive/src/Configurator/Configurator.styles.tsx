/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { Link as ReactLink } from '@exo/frontend-common-link';
import { ifProp, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './Configurator.theme';

const defaultSidebarWidth = '21rem';
const expandedSidebarWidth = '95%';

export const Configurator = styled('div')`
  background: ${props => theme(props).bg};
  color: ${props => theme(props).text};
  min-height: 40rem;
  position: relative;
  text-align: center;
  width: 100%;
`;

export const Nav = styled('div')`
  background: ${props => theme(props).navBg};
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.stack.s7};
  position: relative;
`;

export const BackButton = styled('div')`
  display: inline-block;
  left: ${props => props.theme.spacing.stack.s5};
  margin: auto auto auto 0;
  position: absolute;
  top: 1.25rem;
`;

export const Link = styled(ReactLink)`
  color: ${props => theme(props).link};
  cursor: pointer;
  display: inline-block;
  ${props =>
    responsiveFontBlock(props.theme.typography.body.long.M, { size: '1rem', weight: '400' })};
  margin: 0 0 0 ${props => props.theme.spacing.stack.s9};
  user-select: none;

  &:hover {
    color: ${props => theme(props).linkActive};
  }

  &.active {
    color: ${props => theme(props).linkActive};
    font-weight: 700;
  }
`;

export const Content = styled('div')<{ image?: string }>`
  background: url(${props => props.image}) no-repeat center bottom;
  background-size: cover;
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 0;
`;

export const ModelViewer3D = styled('div')`
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const Sidebar = styled('div')<{ isExpanded?: boolean }>`
  background: ${props => theme(props).bg};
  height: 100%;
  max-width: ${defaultSidebarWidth};
  padding: ${props =>
    `0 ${props.theme.spacing.stack.s5} ${props.theme.spacing.stack.s7} ${props.theme.spacing.stack.s7}`};
  position: absolute;
  right: 0;
  text-align: left;
  top: ${props => props.theme.spacing.stack.s6};
  transition: 500ms all cubic-bezier(0.23, 1, 0.32, 1);
  width: 100%;

  ${props =>
    ifProp(props, 'isExpanded').then(css`
      max-width: ${expandedSidebarWidth};
    `)}
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3, { weight: '700' })};
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-top: -${props => props.theme.spacing.stack.s5};

  & .baseButton {
    ${props =>
      responsiveFontBlock(props.theme.typography.body.long.M, {
        lineHeight: '1.45rem',
        size: '1rem',
        weight: '700'
      })};
    padding: 0.5rem 0.75rem;
  }
`;

export const Button = styled('button')`
  background: transparent;
  border: none;
  display: inline-flex;
  outline: none;
  padding: ${props => props.theme.spacing.stack.s5} 0;

  & svg {
    margin: auto;
    max-height: ${props => props.theme.spacing.stack.s5};
    transform: scale(1);
    transition: 200ms transform cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover,
  &:focus {
    & svg {
      transform: scale(1.2);
    }
  }
`;

export const Menu = styled('div')`
  height: 100%;
  margin: ${props => props.theme.spacing.stack.s5} 0 0;
`;

export const MenuItem = styled('button')`
  align-items: center;
  background: transparent;
  border: none;
  color: ${props => theme(props).link};
  cursor: pointer;
  display: flex;
  ${props =>
    responsiveFontBlock(props.theme.typography.body.short.M, {
      lineHeight: '1.45rem',
      size: '1rem',
      weight: '400'
    })};
  margin: 0.075rem;
  padding: ${props => props.theme.spacing.stack.s5} 0;
  width: 100%;

  &:focus {
    outline: none;
  }

  & .Configurator-icon {
    margin: auto 0 auto auto;
    max-height: 1.25rem;
  }
`;

export const ProductsTitle = styled('div')`
  color: ${props => theme(props).link};
  ${props => responsiveFontBlock(props.theme.typography.heading.heading4, { weight: '600' })};
`;

export const ProductsGrid = styled('div')<{ isExpanded?: boolean }>`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 -1.75rem;
  width: 100%;
  ${props =>
    ifProp(props, 'isExpanded').then(css`
      max-width: ${expandedSidebarWidth};
    `)}
`;

export const Product = styled('button')<{ isExpanded?: boolean; isDisabled?: boolean }>`
  background: none transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  flex: 0 0 33%;
  padding: 1.75rem 0 0 1.75rem;
  text-align: left;

  &:focus {
    outline: none;
  }

  ${props =>
    ifProp(props, 'isExpanded').then(css`
      flex: 0 0 20%;
      margin: 1.75rem 0 0 1.75rem;
      padding: 0;
    `)}

  ${props =>
    ifProp(props, 'isDisabled').then(css`
      opacity: 0.2;
      pointer-events: none;

      &:hover {
        box-shadow: none 0;
      }
    `)}
`;

export const ConfigurationSummary = styled('div')<{ isExpanded?: boolean }>`
  height: 0;
  overflow: hidden;
  transition: 100ms height ease-in-out;

  ${props =>
    ifProp(props, 'isExpanded').then(css`
      height: 50rem;
      overflow: auto;
      transition: 300ms height ease-in-out;
    `)}
`;

export const PriceBar = styled('div')`
  background-color: ${props => theme(props).bg};
  border-radius: ${props => props.theme.spacing.stack.s2};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2), 0 0 1rem rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  max-width: 73.75rem;
  position: relative;
  text-align: center;
  top: -${props => props.theme.spacing.stack.s5};
  z-index: 5;
`;

export const ExpandButton = styled('div')`
  left: 0;
  margin: 0 auto;
  max-width: 5rem;
  position: relative;
  right: 0;
  top: -${props => props.theme.spacing.stack.s6};
  transform: translateX(calc(50% - 9rem));
  z-index: 4;
`;
