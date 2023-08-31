/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-underscore-dangle */

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './NavMobile.theme';

export const Nav = styled.div`
  display: grid;
  gap: ${(props) => theme(props).gap};
  grid-template-areas: 'secondary' 'primary';
  grid-template-rows: auto auto;
  padding: ${(props) => theme(props).padding};
  ${(props) => responsiveFontBlock(theme(props).font)}

  .action {
    ${(props) => responsiveFontBlock(theme(props).font)}
    color: ${(props) => theme(props).color};
    border: none;

    /* stylelint-disable-next-line */
    [role='img'] {
      display: inline;
    }
  }
`;

export const Logo = styled.div`
  .action {
    font-size: 0;

    /* stylelint-disable-next-line */
    [role='img'] {
      display: inline;

      /* stylelint-disable-next-line */
      > img {
        max-height: 2rem;
        max-width: 3rem;
      }
    }
  }
`;

export const PrimaryActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => theme(props).gap};
  grid-area: primary;

  .action {
    padding: 0;
  }
`;

export const SecondaryActions = styled.div`
  align-items: center;
  /* stylelint-disable-next-line */
  border-bottom: 1px solid ${(props) => theme(props).__delimiter.color};
  display: flex;
  gap: ${(props) => theme(props).gap};
  grid-area: secondary;
  padding: 0 0 1rem 0;

  .action {
    ${(props) => responsiveFontBlock(theme(props).font)}
    color: ${(props) => theme(props).__secondaryAction.color};
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
        color: ${(props) => theme(props).__secondaryAction.color};
        height: 100%;
      }
    }
  }
`;
