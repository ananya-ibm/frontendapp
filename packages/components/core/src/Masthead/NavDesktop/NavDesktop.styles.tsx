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
import theme from './NavDesktop.theme';

export const NavRow = styled.div`
  grid-template-rows: 1fr;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 'primary NONE secondary';
  padding: ${(props) => theme(props).padding};
  background: ${(props) => theme(props).background};
  color: ${(props) => theme(props).color};
  display: none;

  .action {
    border: none;
    color: ${(props) => theme(props).color};
    padding: ${(props) => theme(props).__action.padding};
    text-decoration: ${(props) => theme(props).__action.textDecoration};

    &:hover {
      background: ${(props) => theme(props).__action.$hover.background};
      color: ${(props) => theme(props).__action.$hover.color};
      text-decoration: ${(props) => theme(props).__action.$hover.textDecoration};
    }

    /* stylelint-disable-next-line */
    [role='img'] {
      display: inline;
    }
  }

  ${(props) => responsiveFontBlock(theme(props).font)};

  ${(props) =>
    media.greaterThan(props, 'large').then(css`
      display: grid;
    `)}
`;

export const PrimaryActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${(props) => theme(props).gap};
  grid-area: primary;
  /* stylelint-disable-next-line */
  max-width: calc(100vw - 100px);

  overflow: hidden;
  white-space: nowrap;
`;

export const SecondaryActions = styled.div`
  align-items: center;
  display: flex;
  gap: ${(props) => theme(props).gap};
  grid-area: secondary;

  .action {
    ${(props) => responsiveFontBlock(theme(props).font)};

    cursor: pointer;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 0.25rem;
    white-space: no-wrap;

    /* stylelint-disable-next-line */
    [role='img'] {
      align-items: center;
      display: flex;

      /* stylelint-disable-next-line */
      svg {
        height: 100%;
      }
    }
  }
`;
