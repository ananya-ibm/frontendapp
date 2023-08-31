/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  getBottom,
  getTop,
  ifProp,
  media,
  responsiveFontBlock,
  spacing,
  when
} from '@exo/frontend-common-style-utils';
import { ButtonGroup } from '@exo/frontend-components-base';
import styled, { css } from 'styled-components';
import theme from './SidePanel.theme';

type Size = 's' | 'm' | 'l' | 'xl';

const WIDTHS: Record<Size, string> = {
  s: '20rem',
  m: '28rem',
  l: '60vw',
  xl: '75vw'
};

export const SidePanelMain = styled('div')``;

export const SidePanel = styled('div')<{
  size: Size;
  position: 'left' | 'right';
  mode: 'push' | 'compress' | 'onTop';
  isOpen: boolean;
  elevation?: number;
}>`
  background-color: white;
  bottom: ${props => theme(props).bottom};
  box-shadow: ${props => theme(props).boxShadow};
  display: flex;
  flex-direction: column;
  padding-top: ${props => getTop(spacing(theme(props).padding, {}))};
  position: fixed;
  top: ${props => theme(props).top};
  transition: transform 0.25s ease-out;
  width: 100vw;
  z-index: ${props => props.elevation ?? theme(props).zIndex};

  /* Position outside of screen */
  ${props => props.position === 'left' && 'left: calc(-100vw - 1rem);'}
  ${props => props.position === 'right' && 'right: calc(-100vw - 1rem);'}

  /* Move into screen when open */
  ${props =>
    props.position === 'left' && props.isOpen && 'transform: translateX(calc(100vw + 1rem));'}
  ${props =>
    props.position === 'right' && props.isOpen && 'transform: translateX(calc(-100vw - 1rem));'}

  /* Shift the main panel as needed */
  ${props =>
    props.mode === 'push' &&
    css`
      & ~ ${SidePanelMain} {
        ${props.position === 'left' && props.isOpen && 'transform: translateX(100vw);'}
        ${props.position === 'right' && props.isOpen && 'transform: translateX(-100vw);'}
      }
    `}

  max-width: 80vw;

  ${props =>
    media.greaterThan(props, 'medium').then(css`

    width: ${WIDTHS[props.size]};

    /* Position outside of screen */
    ${props.position === 'left' && `left: calc(-${WIDTHS[props.size]} - 1rem);`}
    ${props.position === 'right' && `right: calc(-${WIDTHS[props.size]} - 1rem);`}

    /* Move into screen when open */
    ${props.position === 'left' &&
      props.isOpen &&
      `transform: translateX(calc(${WIDTHS[props.size]} + 1rem));`}
    ${props.position === 'right' &&
      props.isOpen &&
      `transform: translateX(calc(-${WIDTHS[props.size]} - 1rem));`}

    /* Shift the main panel as needed */
    ${ifProp(props, 'mode').switch([
      when.eq('compress').then(css`
        & ~ ${SidePanelMain} {
          position: relative;
          ${props.position === 'left' && props.isOpen && `margin-left: ${WIDTHS[props.size]};`};
          ${props.position === 'right' && props.isOpen && `margin-right: ${WIDTHS[props.size]};`};
        }
      `),
      when.eq('push').then(css`
        & ~ ${SidePanelMain} {
          position: relative;
          ${props.position === 'left' &&
            props.isOpen &&
            `transform: translateX(${WIDTHS[props.size]});`}
          ${props.position === 'right' &&
            props.isOpen &&
            `transform: translateX(-${WIDTHS[props.size]});`}
        }
      `)
    ])};
  `)}

  & ~ ${SidePanelMain} {
    transition: transform 0.25s ease-out, margin 0.25s ease-out;
  }
`;

export const Header = styled('div')`
  align-items: center;
  display: flex;
  margin-bottom: ${props => props.theme.spacing.stack.s5};
  padding: ${props => spacing(theme(props).padding, { vertical: 0 })};
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
`;

export const Close = styled('button')<{ show: boolean }>`
  ${props => !props.show && 'visibility: hidden;'}
  margin-left: auto;
  border: none;
  cursor: pointer;

  /* stylelint-disable-next-line selector-max-universal */
  & > *:hover {
    color: ${props => props.theme.colors.interactive.primary.hover.bg};
  }
`;

export const Body = styled('div')<{ isScrolling: boolean }>`
  height: 100%;
  margin-bottom: ${props => getBottom(spacing(theme(props).padding, {}))};
  ${props => props.isScrolling && 'overflow-y: auto;'};
  ${props => !props.isScrolling && 'overflow: hidden;'};
  padding: ${props => spacing(theme(props).padding, { vertical: '0' })};

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const Section = styled('div')`
  padding: ${props => spacing(theme(props).padding, { vertical: '0' })};
`;

export const Footer = styled('div')`
  margin-bottom: ${props => getBottom(spacing(theme(props).padding, {}))};
  margin-top: calc(-1 * ${props => getBottom(spacing(theme(props).padding, {}))});
  padding: ${props => spacing(theme(props).padding, { vertical: '0' })};
`;

export const Buttons = styled(ButtonGroup)`
  height: ${props => theme(props).buttonHeight};
  margin-top: auto;
  width: 100%;

  /* stylelint-disable-next-line selector-max-universal */
  & > * {
    height: ${props => theme(props).buttonHeight};
    width: 50%;
  }
`;

export const Overlay = styled('div')<{ isVisible: boolean }>`
  ${props => props.isVisible && `background: ${props.theme.colors.backgrounds.overlay};`}
  ${props => !props.isVisible && 'background: transparent;'}
  
  position: fixed;
  left: 0;
  top: 0;
  top: ${props => theme(props).top};
  width: 100vw;
  height: 100vh;
  z-index: 10;
  overscroll-behavior: none;
  transition: background 0.25s ease-out;
`;
