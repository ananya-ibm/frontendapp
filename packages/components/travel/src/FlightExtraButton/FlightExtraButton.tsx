/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/require-default-props, import/no-named-as-default, react/boolean-prop-naming */

import React, { useState } from 'react';
// import { Action } from '../Action/Action';
import * as S from './FlightExtraButton.styles';

const sizeToCarbonSize: Partial<Record<Size, string>> = {
  small: 'sm',
  medium: 'md',
  field: 'md',
  large: 'lg'
};

// TODO: Tooltip is no supported for Carbon

export const FlightExtraButton = ({
  label,
  onClick,
  type = 'button',
  disabled,
  size,
  icon,
  iconPosition = 'left',
  tooltip,
  className,
  href,
  isInitiallyActive,
  ...rest
}: Props) => {
  const [isActive, setIsActive] = useState(isInitiallyActive ?? false);

  const handleClick = () => {
    setIsActive(current => !current);
  };

  // TODO: Fix this
  if (!onClick && href) {
    onClick = () => window.location.assign(href!);
  }

  return (
    <S.CarbonButtonWrapper
      isActive={isActive}
      hasIconOnly={icon && !label}
      onClick={handleClick}
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
};

type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'light' | 'link';

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
  isInitiallyActive?: boolean;
};
