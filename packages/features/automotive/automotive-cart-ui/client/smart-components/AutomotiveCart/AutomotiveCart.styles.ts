/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled, { css } from 'styled-components';
import { Grid } from '@exo/frontend-components-base';
import { ifProp, responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const AutomotiveCart = styled(Grid)`
  ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
  margin: ${props => props.theme.spacing.stack.s7} auto ${props => props.theme.spacing.stack.s12};
  min-height: 40vh;
`;

export const CartHeader = styled('div')`
  display: flex;
  gap: ${props => props.theme.spacing.inline.s9};
  margin-bottom: ${props => props.theme.spacing.stack.s9};
`;

export const Title = styled('div')`
  ${props => responsiveFontBlock(props.theme.typography.heading.heading1)};
`;

export const Text = styled('p')`
  ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
  margin: ${props => props.theme.spacing.stack.s4} 0 0;
  max-width: 70%;
`;

export const ButtonText = styled('div')`
  margin: ${props => props.theme.spacing.stack.s8} 0 0 auto;
`;

export const EmptyCart = styled('div')`
  margin-top: ${props => props.theme.spacing.stack.s8};
`;

export const CartContent = styled('div')`
  display: grid;
  grid-gap: 2rem;
  grid-template-areas:
    'left right-top'
    'left right-botton'
    'left right-button';
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto 1fr;
  margin-top: ${props => props.theme.spacing.stack.sXXL};
`;

export const CartButton = styled('div')`
  grid-area: right-button;
`;

export const CarSelection = styled('div')<{ isFinanceOpen?: boolean }>`
  ${props => ifProp(props, 'isFinanceOpen').isTruthy().then(css`
    grid-area: right-top;
  `)};
  ${props => ifProp(props, 'isFinanceOpen').isFalsy().then(css`
    grid-area: left;
  `)};
`;

export const Finance = styled('div')<{ isFinanceOpen?: boolean }>`
  ${props => ifProp(props, 'isFinanceOpen').isTruthy().then(css`
    grid-area: left;
  `)};
  ${props => ifProp(props, 'isFinanceOpen').isFalsy().then(css`
    grid-area: right-top;
  `)};
`;

export const Button = styled('div')`
  margin-top: ${props => props.theme.spacing.stack.s8};
  text-align: right;
`;
