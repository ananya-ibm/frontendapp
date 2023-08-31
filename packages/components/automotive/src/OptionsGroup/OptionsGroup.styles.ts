/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './OptionsGroup.theme';

export const OptionsGroup = styled('div')`
  display: flex;
`;

export const Label = styled('label')`
  background: ${props => theme(props).background};
  border: 0.0625rem solid ${props => theme(props).border};
  border-radius: ${props => theme(props).borderRadius};
  color: ${props => theme(props).text};
  cursor: pointer;
  display: inline-flex;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { weight: 700, size: '1rem' })};
  justify-content: center;
  outline: none;
  padding: ${props => props.theme.spacing.stack.s4} 1.75rem;
  text-transform: ${props => theme(props).textTransform};
  transition: ${props => props.theme.motion.easings.easeIn.regular};
  user-select: none;
`;

export const Input = styled('input')`
  opacity: 0;
  position: fixed;
  width: 0;

  &:checked + ${Label} {
    border: 0.0625rem solid ${props => theme(props).checkedBorder};
    color: ${props => theme(props).checkedText};
  }
`;

export const Option = styled('div')`
  margin-left: ${props => props.theme.spacing.inline.sXL};

  &:first-child {
    margin-left: 0;
  }
`;
