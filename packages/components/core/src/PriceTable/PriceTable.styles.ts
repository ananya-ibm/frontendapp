/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp } from '@exo/frontend-common-style-utils';

export const PriceTable = styled('div')<{ hasHelpText?: boolean }>`
  ${props => ifProp(props, 'hasHelpText').then(css`
    padding-right: 2rem;
  `)}
`;

export const Row = styled('div')`
  border-bottom: 0.0625rem solid ${props => props.theme.colors.backgrounds.panels.primary.base};
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const Text = styled('div')`
  padding: 1rem 0;
`;

export const Price = styled('div')`
  border-bottom: 0;
  font-weight: 700;
  padding: 1rem 0;
`;

export const Help = styled('div')`
  display: flex;
  height: 100%;
  position: absolute;
  right: -2rem;
  top: 0;
  width: 2rem;

  & svg {
    margin: auto;
    max-width: 1rem;
  }
`;
