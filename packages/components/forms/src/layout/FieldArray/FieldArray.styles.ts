/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { media } from '@exo/frontend-common-style-utils';
import theme from './FieldArray.theme';
import { Layer } from '@exo/frontend-components-base';

export const FieldArray = styled(Layer).attrs(() => ({ isStyled: true }))`
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const Title = styled('div')`
  font-weight: bold;
`;

export const Toolbar = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

type RowProps = { variant?: string };
export const Row = styled(Layer).attrs(() => ({ isStyled: true }))<RowProps>`
  display: flex;
  padding: ${props => theme(props).rowPadding};
  margin-bottom: 1rem;

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
