/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import React from 'react';
import { Action } from '../Action/Action';
import * as S from './Button.styles';

const variantToKind: Partial<Record<Variant, string>> = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  danger: 'danger',
  'danger-tertiary': 'danger--tertiary',
  light: 'ghost'
};

const sizeToCarbonSize: Partial<Record<Size, string>> = {
  small: 'sm',
  medium: 'md',
  field: 'md',
  large: 'lg'
};

// TODO: Tooltip is no supported for Carbon

export const Button = ({
  variant = 'primary',
  label,
  onClick,
  type = 'button',
  disabled,
  size,
  icon,
  iconPosition = 'right',
  tooltip,
  className,
  action,
  href,
  ...rest
}: Props) => {
  if (action) {
    /* eslint-disable no-param-reassign */
    href = href ?? action.props.href;
    icon = icon ?? action.props.icon;
    label = label ?? action.props.label;
    onClick = onClick ?? action.props.onClick;
    /* eslint-enable no-param-reassign */
  }

  // TODO: Fix this
  if (!onClick && href) {
    onClick = () => window.location.assign(href!);
  }

  if (variant === 'link') {
    return (
      <S.LinkButton
        onClick={
          !disabled
            ? e => {
                e.preventDefault();
                onClick?.();
                return false;
              }
            : () => {}
        }
        disabled={disabled}
        className={className}
        {...rest}
      >
        <>
          {icon && iconPosition === 'left' && <S.LinkIconLeft>{icon}</S.LinkIconLeft>}
          {label}
          {icon && iconPosition === 'right' && <S.LinkIconRight>{icon}</S.LinkIconRight>}
        </>
      </S.LinkButton>
    );
  } else {
    let kind = variantToKind[variant];
/*    if (icon && !label && kind === 'danger') {
      // danger not support for icon only buttons
      kind = 'primary';
    }*/
    return (
      // @ts-ignore
      <S.CarbonButtonWrapper
        kind={kind}
        hasIconOnly={icon && !label}
        onClick={onClick}
        disabled={disabled}
        type={type}
        size={size && sizeToCarbonSize[size]}
        iconDescription={tooltip ?? label ?? 'icon'}
        className={className}
        {...rest}
      >
        {icon && iconPosition === 'left' && <S.IconLeft>{icon}</S.IconLeft>}
        {label} {icon && iconPosition === 'right' && <div className="cds--btn__icon">{icon}</div>}
      </S.CarbonButtonWrapper>
    );
  }
};

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'danger-tertiary' | 'light' | 'link';

type Size = 'small' | 'medium' | 'large' | 'field';

type Props = {
  variant?: Variant;
  size?: Size;
  type?: 'reset' | 'submit' | 'button';
  label?: React.ReactNode;
  icon?: JSX.Element;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  tooltip?: string;
  onClick?: (e?: any) => void;
  className?: string;
  href?: string;
  action?: React.ReactComponentElement<typeof Action>;
};
