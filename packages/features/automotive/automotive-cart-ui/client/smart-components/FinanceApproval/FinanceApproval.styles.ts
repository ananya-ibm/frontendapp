/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import styled from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

export const FinanceApproval = styled('div')`
  animation: ${props => props.theme.motion.entry.regular};
  padding: ${props => props.theme.spacing.inline.s10};

  & .copy {
    ${props => responsiveFontBlock(props.theme.typography.body.short.L)};
    margin: ${props => props.theme.spacing.stack.s7} 0 0;

    &:not(:first-of-type) {
      margin: ${props => props.theme.spacing.stack.s4} 0 0;
    }
  }
`;

export const Alert = styled('div')`
  align-items: center;
  display: flex;
  margin: ${props => props.theme.spacing.stack.s7} 0 0;

  & .copy {
    ${props => responsiveFontBlock(props.theme.typography.body.short.emL)};
    margin-left: ${props => props.theme.spacing.stack.s7};
  }
`;

export const Icon = styled('div')`
  flex: 0 0 ${props => props.theme.spacing.stack.s7};

  & svg {
    transform: scale(1.5);
  }
`;

export const Loading = styled('div')`
  animation: ${props => props.theme.motion.entry.regular};
`;

export const Progress = styled('div')`
  margin: ${props => props.theme.spacing.stack.s7} 0 0;
  text-align: center;

  & .copy {
    margin: ${props => props.theme.spacing.stack.s7} auto 0;
  }
`;

export const Meter = styled('div')`
  margin: ${props => props.theme.spacing.stack.s7} auto;
  max-width: 5rem;

  .CircularProgressbar {
    vertical-align: middle;
    width: 100%;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: ${props => props.theme.colors.brand.brand1.base};
    stroke-linecap: round;
    stroke-width: 1rem;
    transform: scale(0.8) translate(0.75rem, 0.75rem);
    transition: stroke-dashoffset 0.5s ease 0s;
  }

  .CircularProgressbar .CircularProgressbar-trail {
    stroke: ${props => props.theme.colors.interactive.disabled.bg};
    stroke-linecap: round;
    transform: scale(0.8) translate(0.75rem, 0.75rem);
  }

  .CircularProgressbar .CircularProgressbar-text {
    display: none;
  }

  .CircularProgressbar .CircularProgressbar-background {
    stroke: ${props => props.theme.colors.interactive.disabled.bg};
  }

  .CircularProgressbar.CircularProgressbar-inverted
    .CircularProgressbar-background {
    fill: #c9deff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
    fill: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
    stroke: ${props => props.theme.colors.backgrounds.panels.secondary.base};
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
    stroke: transparent;
  }
`;

export const ButtonGroup = styled('div')`
  display: flex;
  justify-content: space-between;
  margin: ${props => props.theme.spacing.stack.s10} 0 0;
`;
