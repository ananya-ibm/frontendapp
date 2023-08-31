/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-underscore-dangle */

import styled, { css } from 'styled-components';
import { media, responsiveFontBlock } from '@exo/frontend-common-style-utils';
import { transparentize } from 'color2k';
import theme from './Header.theme';


export const HeaderWrapper = styled.div`
  border-bottom: ${props => theme(props).borderBottom};
  background: ${(props) => theme(props).background};
  color: ${(props) => theme(props).color};
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-areas: 'menu-toggle logo title secondary search actions';
  grid-template-columns: auto auto auto auto 1fr auto;
  grid-template-rows: 1fr;

  min-height: 3rem;
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;

  .action {
    border: none;
    color: ${(props) => theme(props).color};
    cursor: pointer;

    /* stylelint-disable-next-line */
    [role='img'] {
      align-items: center;
      display: flex;

      /* stylelint-disable-next-line */
      svg {
        color: ${(props) => theme(props).color};
        height: 100%;
      }
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  grid-area: actions;
  align-items: center;
  padding: ${(props) => theme(props).padding};

  .action {
    padding: ${props => theme(props).__action.padding};
  }
  .action:not(.has-icon) {
    font-size: ${props => props.theme.typography.body.short.M.size};
    color: ${props => props.theme.colors.link.base};
    :hover {
      color: ${props => props.theme.colors.link.hover};
      text-decoration: underline;
    }
  }
  .action.has-icon {
    font-size: 0;
  }

  .hide-mobile { display: none; }
  ${props => media.greaterThan(props, 'medium').then(css`
    .hide-desktop { display: none; }
    .hide-mobile { display: block; }
  `)}
}
`;

export const Search = styled.div`
  display: flex;
  grid-area: search;
  align-items: center;
  justify-content: flex-end;


  /* Search across full width in smaller breakpoints */
  ${(props) =>
    media.lessThan(props, 'medium').then(css`
      &:not(:empty) {
        position: absolute;
        left: 0;
        right: 0;
        top: var(--top);
        bottom: 0;
        z-index: 100;

        .cds--search {
          margin: 0;
          width: 100%;
        }
      }
  `)}
  
  .cds--search {
    margin-left: 1rem;
    width: 100%;
  }

  .cds--search, .cds--search-input { height: 100%; }
`;

export const Title = styled.div`
  display: flex;
  grid-area: title;
  align-items: center;
  margin-left: 1rem;

  gap: 1rem;

  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  color: ${props => props.theme.colors.text.primary};
  font-weight: 600;
`;

export const Logo = styled.div<{ hasMenuToggle: boolean }>`
  display: flex;
  grid-area: logo;
  align-items: center;

  padding: 0;
  ${(props) => media.greaterThan(props, 'medium').then(css`
    padding: ${theme(props).__logo.padding};
  `)}
  ${props => (! props.hasMenuToggle && css`padding: ${theme(props).__logo.padding};`)}

  .action {
    font-size: 0;
  }

  /* stylelint-disable-next-line */
  img,
  svg {
    width: ${(props) => theme(props).__logo.maxWidth};
    height: ${(props) => theme(props).__logo.maxHeight};
    max-width: ${(props) => theme(props).__logo.maxWidth};
    max-height: ${(props) => theme(props).__logo.maxHeight};
  }
`;

export const ScrollPane = styled.div<{ canScrollLeft: boolean }>`
  display: grid;
  grid-template-columns: min-content 10fr min-content;
  align-items: center;
  height: 100%;
  ${props => !props.canScrollLeft && css`padding-left: 1rem;`}
`;

export const NavigationWrapper = styled.div`
  grid-area: secondary;
  display: none;
  position: relative;

  ${(props) => media.greaterThan(props, 'medium').then(css`
    display: block;
    &:before {
      content: '';
      position: absolute;
      border-left: 1px solid ${props.theme.colors.delimiters.lowContrast};
      left: 0;
      top: 0.75rem;
      bottom: 0.75rem;
    }
    margin-left: 2rem;
  `)}
`;

export const ScrollArea = styled.div`
  ${(props) => media.greaterThan(props, 'medium').then(css`
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      height: 100%;
      width: 1rem;
      background: linear-gradient(
        90deg, 
        ${transparentize(theme(props).background as string, 0)} 50%, 
        ${transparentize(theme(props).background as string, 1)} 100%
      );
      top: 0;
      left: 0;
      z-index: 100;
    }
    &:after {
      content: '';
      position: absolute;
      height: 100%;
      width: 1rem;
      background: linear-gradient(
        -90deg, 
        ${transparentize(theme(props).background as string, 0)} 50%, 
        ${transparentize(theme(props).background as string, 1)} 100%
      );
      top: 0;
      right: 0;
      z-index: 100;
    }
  `)}
`;

export const Navigation = styled.div`
  flex-wrap: nowrap;

  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none; 
  margin-right: 2px;
  &::-webkit-scrollbar {
    display: none;
  }

  .action {
    ${(props) => responsiveFontBlock(theme(props).font)};
    padding: 0.25rem 1rem;
    white-space: nowrap;

    /* stylelint-disable-next-line */
    [role='img'] {
      display: none;
    }
  }
`;

export const MenuToggle = styled.div`
  grid-area: menu-toggle;
  align-items: center;
  display: flex;

  .action {
    height: 100%;
    padding: ${(props) => theme(props).__action.padding};
    margin: ${(props) => theme(props).__menuToggle.margin};
  }

  ${(props) => media.greaterThan(props, 'medium').then(css`
    display: none;
  `)}
`;

