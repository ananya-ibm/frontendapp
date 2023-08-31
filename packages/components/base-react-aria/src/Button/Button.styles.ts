/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button as BaseButton } from '@exo-original/frontend-components-base';
import styled, { css } from 'styled-components';
import theme from './Button.theme';

type Props = React.ComponentProps<typeof BaseButton>;

export const Icon = styled.div`
`;

export const Button = styled('button')<Pick<Props, 'size' | 'variant'>>`
  padding: ${props => props.theme.spacing.squishedInset.S};
  display: flex;
  gap: ${props => props.theme.spacing.inline.s5};
  font-weight: ${props => theme(props).fontWeight};

  font-size: ${props => ({
    small: props.theme.typography.body.short.S.size,
    medium: props.theme.typography.body.short.M.size,
    large: props.theme.typography.body.short.L.size,
    field: props.theme.typography.body.short.M.size
  })[props.size ?? 'medium']};

  ${props => props.variant === 'primary' ? css`
    background-color: ${props.theme.colors.interactive.primary.base.bg};
    border-color: ${props.theme.colors.interactive.primary.base.bg};
    color: ${props.theme.colors.interactive.primary.base.fg};

    &:hover {
      background-color: ${props.theme.colors.interactive.primary.hover.bg};
      border-color: ${props.theme.colors.interactive.primary.hover.bg};
      color: ${props.theme.colors.interactive.primary.hover.fg};
    }

    &:active {
      background-color: ${props.theme.colors.interactive.primary.active.bg};
      border-color: ${props.theme.colors.interactive.primary.active.bg};
      color: ${props.theme.colors.interactive.primary.active.fg};
    }
  ` : ''}

  ${props => props.variant === 'secondary' ? css`
    background-color: ${props.theme.colors.interactive.secondary.base.bg};
    border-color: ${props.theme.colors.interactive.secondary.base.bg};
    color: ${props.theme.colors.interactive.secondary.base.fg};

    &:hover {
      background-color: ${props.theme.colors.interactive.secondary.hover.bg};
      border-color: ${props.theme.colors.interactive.secondary.hover.bg};
      color: ${props.theme.colors.interactive.secondary.hover.fg};
    }

    &:active {
      background-color: ${props.theme.colors.interactive.secondary.active.bg};
      border-color: ${props.theme.colors.interactive.secondary.active.bg};
      color: ${props.theme.colors.interactive.secondary.active.fg};
    }
  ` : ''}

  ${props => props.variant === 'tertiary' ? css`
    background-color: ${props.theme.colors.interactive.tertiary.base.bg};
    border-color: ${props.theme.colors.interactive.tertiary.base.bg};
    color: ${props.theme.colors.interactive.tertiary.base.fg};

    &:hover {
      background-color: ${props.theme.colors.interactive.tertiary.hover.bg};
      border-color: ${props.theme.colors.interactive.tertiary.hover.bg};
      color: ${props.theme.colors.interactive.tertiary.hover.fg};
    }

    &:active {
      background-color: ${props.theme.colors.interactive.tertiary.active.bg};
      border-color: ${props.theme.colors.interactive.tertiary.active.bg};
      color: ${props.theme.colors.interactive.tertiary.active.fg};
    }
  ` : ''}

  ${props => props.variant === 'light' ? css`
    background-color: white;
    border-color: ${props.theme.colors.text.tertiary};
    color: ${props.theme.colors.text.tertiary};
  ` : ''}

  ${props => props.variant === 'link' ? css`
    border-width: 0;
    color: ${props.theme.colors.link.base};
    padding: 0;

    &:hover {
      text-decoration: underline;
    }
  ` : ''}

  ${props => props.variant === 'danger' ? css`
    background-color: ${props.theme.colors.interactive.danger.base.bg};
    border-color: ${props.theme.colors.interactive.danger.base.bg};
    color: ${props.theme.colors.interactive.danger.base.fg};

    &:hover {
      background-color: ${props.theme.colors.interactive.danger.hover.bg};
      border-color: ${props.theme.colors.interactive.danger.hover.bg};
      color: ${props.theme.colors.interactive.danger.hover.fg};
    }

    &:active {
      background-color: ${props.theme.colors.interactive.danger.active.bg};
      border-color: ${props.theme.colors.interactive.danger.active.bg};
      color: ${props.theme.colors.interactive.danger.active.fg};
    }
  ` : ''}
`;
