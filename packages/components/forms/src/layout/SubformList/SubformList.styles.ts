/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './SubformList.theme';
import { Layer } from '@exo/frontend-components-base';

export const SubformList = styled('div')`
  /* ... */
`;

export const Title = styled('div')`
  background-color: ${props => props.theme.colors.backgrounds.panels.tertiary.base};
  font-weight: bold;
  padding: ${props => theme(props).titlePadding};
`;

export const Toolbar = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

type RowProps = { variant?: string };
export const Row = styled('div')<RowProps>`
  background-color: ${props => props.theme.colors.backgrounds.panels.primary.base};
  border-bottom: 0.125rem solid ${props => props.theme.colors.delimiters.primary};
  display: flex;
  padding: ${props => theme(props).rowPadding};

  ${props =>
    props.variant === 'row' &&
    `
    align-items: center;
    & > * {
      margin-left: ${theme(props).rowItemMargin};
    }
    & > *:first-child {
      margin-left: 0;
    }
  `}
  
  ${props => media.lessThan(props, 'medium').then(css`
    ${props.variant === 'row' &&
      `
      flex-direction: column;
      & > * {
        margin-left: 0em;
        margin-top: ${theme(props).rowItemMargin};
        width: 100%;
      }
      & > *:first-child {
        margin-left: 0;
        margin-top: 0;
      }
    `}
  `)}

  ${props =>
    props.variant === 'entry' &&
    `
    flex-direction: column;
    & > * {
      margin-top: ${theme(props).rowItemMargin};
      width: 100%;
    }
    & > *:first-child {
      margin-top: 0;
    }
  `}

`;

export const EntryToolbar = styled('div')`
  text-align: right;
`;

export const Fields = styled(Layer)`
  flex-basis: 100%;
`;
