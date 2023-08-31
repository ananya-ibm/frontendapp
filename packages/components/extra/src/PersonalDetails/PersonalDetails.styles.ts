/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Media = styled('div')`
  flex: 0 0 8rem;
  height: 8rem;
  position: relative;
  width: 8rem;
`;

export const Image = styled('div')`
  align-items: center;
  background: #c9deff;
  border-radius: 50%;
  color: ${props => props.theme.colors.brand.brand1.base};
  display: flex;
  ${props => responsiveFontBlock(props.theme.typography.heading.heading1, { weight: 700 })};
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Content = styled('div')`
  color: ${props => props.theme.colors.text.secondary};
  flex: 0 0 75%;
  padding-left: 2rem;
  padding-top: 1rem;

  /* stylelint-disable selector-max-type */
  & h1 {
    color: ${props => props.theme.colors.text.primary};
    ${props => responsiveFontBlock(props.theme.typography.heading.heading4)};
  }

  & div {
    margin: 0.75rem 0 0;
  }

  & dt {
    display: inline-block;
    position: relative;

    &::after {
      content: ': ';
      display: inline;
    }
  }

  & dd {
    display: inline;
    font-weight: 400;
    margin-left: 0.25rem;
  }
  /* stylelint-enable */
`;

export const PersonalDetails = styled('div')<{ isSmall?: boolean }>`
  display: flex;

  ${props => ifProp(props, 'isSmall').then(css`
    padding: 1.5rem;

    ${Media} {
      flex: 0 0 4rem;
      height: 4rem;
    }

    ${Image} {
      font-size: 1rem;
    }

    ${Content} {
      font-size: 0.8rem;
      padding-top: 0.25rem;

      & h1 {
        font-size: 1rem;
      }

      & div {
        margin: 0.25rem 0 0;
      }
    }
  `)}
`;

export const Button = styled('button')`
  background: ${props => props.theme.colors.interactive.primary.base.bg};
  border: none;
  border-radius: 50%;
  bottom: 0;
  color: ${props => props.theme.colors.interactive.primary.base.fg};
  display: flex;
  height: 2.5rem;
  position: absolute;
  right: 0;
  transition: background 195ms;
  width: 2.5rem;

  &:hover {
    background: ${props => props.theme.colors.interactive.primary.hover.bg};
  }

  & svg {
    margin: auto;
  }
`;
