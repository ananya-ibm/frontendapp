/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Link as ReactLink } from '@exo/frontend-common-link';
import { Button as CarbonButton } from '@carbon/react';
import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';
import theme from './Button.theme';

export const LinkButton = styled(ReactLink)<{ disabled?: boolean }>`
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.theme.colors.link[props.disabled ? 'disabled' : 'base']};
  cursor: pointer;

  display: inline-flex;
  ${props => responsiveFontBlock(props.theme.typography.body.short.M, { weight: 'bold' })};

  text-decoration: underline;

  &:hover {
    color: ${props => props.theme.colors.link[props.disabled ? 'disabled' : 'hover']};
  }

  & svg {
    color: ${props => props.theme.colors.icon.primary};
  }
`;

export const LinkIconRight = styled('span')`
  line-height: 100%;
  margin-left: 0.6rem;
  margin-top: 0.2rem;
`;

export const LinkIconLeft = styled('span')`
  line-height: 100%;
  margin-right: ${props => props.theme.spacing.inline.s4};
  margin-top: 0.2rem;
`;

export const IconLeft = styled('div')`
  height: 1rem;
  margin-bottom: 0.1rem;
  margin-right: ${props => props.theme.spacing.inline.s4};
`;

export const CarbonButtonWrapper = styled(CarbonButton)`
  font-size: ${props => theme(props).fontSize};
  font-weight: ${props => theme(props).fontWeight};
  line-height: 0;
  white-space: nowrap;

  svg {
    max-height: 100%;
  }
`;
