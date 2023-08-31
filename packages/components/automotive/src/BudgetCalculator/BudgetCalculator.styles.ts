/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const BudgetCalculator = styled('div')`
  padding: ${props => props.theme.spacing.inset.XL};
  width: 100%;
`;

export const BoldText = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading5)};
  margin-top: ${props => props.theme.spacing.stack.s6};
`;

export const Section = styled('div')`
  margin: ${props => props.theme.spacing.stack.s6};
`;

export const Content = styled('div')`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.stack.s6};
  /* Carbon Dropdown */
  & .cds--dropdown--xl {
    min-width: 12rem;
  }
  /* Carbon Slider */
  & .cds--slider-container {
    margin-bottom: ${props => props.theme.spacing.stack.s6};
    min-width: 35rem;
  }

  & .cds--slider-text-input {
    width: 6rem;
  }
`;

export const Options = styled('div')`
  align-content: left;
`;

export const NextButton = styled('div')`
  align-content: right;
`;

export const ActionBar = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.inset.L};
`;
