/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { ifProp, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Title = styled('div')<{ unbold?: boolean }>`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading3)};
  ${props => ifProp(props, 'unbold').then(css`
    font-weight: 400;
  `)};
`;

export const TabContent = styled('div')`
  & .cds--slider-container {
    width: 100%;
  }

  & .cds--slider-text-input {
    margin-left: auto;
    min-width: 5rem;
    width: auto;
  }

  & .cds--slider__range-label {
    min-width: 2.25rem;
  }
`;

export const FinanceOptions = styled('div')`
  display: grid;
  grid-gap: 2rem;
`;

export const SelectedFinanceOption = styled('div')`
  background: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  padding: 2rem;
`;

export const CashPrice = styled('span')`
  color: ${props => props.theme.colors.brand.brand1.base};
  font-weight: 700;
`;

export const Option = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Options = styled('div')`
  color: ${props => props.theme.colors.interactive.secondary.base.bg};

  & ${Option} {
    padding: 1rem;
  }
  & ${Option}:not(:last-child) {
    border-bottom: 0.0625rem solid ${props => props.theme.colors.delimiters.primary};
  }
`;

export const Terms = styled('div')`
  border-bottom: 0.0625rem solid ${props => props.theme.colors.delimiters.primary};
  padding: 1rem 0 2rem 0;
`;
