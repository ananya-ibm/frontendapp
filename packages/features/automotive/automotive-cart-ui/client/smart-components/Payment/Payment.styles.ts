/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const Payment = styled('div')`
  animation: ${props => props.theme.motion.entry.regular};
  padding: ${props => props.theme.spacing.stack.s10};

  & .copy {
    ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
    margin: ${props => props.theme.spacing.stack.s7} 0 0;

    &:not(:first-of-type) {
      margin: ${props => props.theme.spacing.stack.s4} 0 0;
    }
  }

  & .copy.bold {
    font-weight: 700;
  }
`;

export const Alert = styled('div')`
  align-items: center;
  display: flex;
  margin: ${props => props.theme.spacing.stack.s7} 0 0;

  & .copy {
    font-weight: 700;
    margin: 0 0 0 ${props => props.theme.spacing.inline.s7};
  }
`;

export const Icon = styled('div')`
  flex: 0 0 ${props => props.theme.spacing.inline.s7};

  & svg {
    transform: scale(1.5);
  }
`;

export const Image = styled('img')`
  margin: ${props => props.theme.spacing.stack.s7} 0 0;
  max-width: 33rem;
  width: 100%;
`;

export const Form = styled('div')`
  margin: ${props => props.theme.spacing.stack.s7} 0 0;

  & .StripeElement {
    border: 0.125rem solid ${props => props.theme.colors.delimiters.primary};
    margin: ${props => props.theme.spacing.stack.s7} 0 0;
    padding: ${props => props.theme.spacing.stack.s5};
  }
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.stack.s10} 0 0;
  width: 100%;
`;

export const PaymentForm = styled('div')`
  position: relative;

  & .billingInfo {
    ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
    margin: ${props => props.theme.spacing.stack.s5} 0;
  }
`;

export const Loading = styled('div')`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Link = styled('span')`
  text-decoration: underline;
`;
