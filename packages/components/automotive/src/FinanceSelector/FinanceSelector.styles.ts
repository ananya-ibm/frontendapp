/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { responsiveFontBlock, ifProp } from '@exo/frontend-common-style-utils';
import theme from './FinanceSelector.theme';

export const FinanceSelector = styled('div')`
  background: ${props => theme(props).background};
`;

export const Tabs = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Tab = styled('button')<{ isActive?: boolean }>`
  background: ${props => theme(props).background};
  border: none;
  cursor: pointer;
  ${props => responsiveFontBlock(props.theme.typography.body.long.M)};
  outline: none;
  padding: ${props => theme(props).tabSpacing};
  width: 100%;

  ${props => ifProp(props, 'isActive').isTruthy().then(css`
    box-shadow: ${theme(props).tabUnderlineActive};
    font-weight: 700;
  `)}
  ${props => ifProp(props, 'isActive').isFalsy().then(css`
    box-shadow: ${theme(props).tabUnderlineInactive};
    font-weight: 400;
  `)}
`;

export const Content = styled('div')`
  padding: ${props => theme(props).tilePadding};
`;
