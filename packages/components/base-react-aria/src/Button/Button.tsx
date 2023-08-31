/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button as BaseButton } from '@exo-original/frontend-components-base';
import { useButton } from 'react-aria';
import { useRef } from 'react';
import * as S from './Button.styles';

export const Button: typeof BaseButton = (props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  const { variant = 'primary', label, onClick, size, icon, iconPosition = 'right' } = props;

  return (
    <S.Button
      ref={ref}
      {...buttonProps}
      onClick={(e) => onClick?.(e)}
      size={size}
      variant={variant}
    >
      {icon && iconPosition === 'left' && <S.Icon>{icon}</S.Icon>}
      {label}
      {icon && iconPosition === 'right' && <S.Icon>{icon}</S.Icon>}
    </S.Button>
  );
};
