/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './RadioButton.styles';

export const RadioButton = React.forwardRef<HTMLInputElement>(
  (
    {
      id,
      name,
      onChange,
      onBlur,
      disabled,
      checked,
      defaultChecked,
      value,
      helpText,
      labelText,
      errorText,
      className,
      ...rest
    }: Props,
    ref
  ) => {
    return (
      <S.RadioButton className={className}>
        <div className="cds--radio-button-wrapper">
          <input
            disabled={disabled}
            /* @ts-ignore */
            ref={ref}
            id={id}
            name={name}
            onChange={(e) => {
              onChange?.(e);
            }}
            checked={checked}
            onBlur={onBlur}
            type="radio"
            className="cds--radio-button"
            value={value}
            {...rest}
          />
          <label htmlFor={id} className="cds--radio-button__label">
            <span className="cds--radio-button__appearance" />
            <span>{labelText}</span>
          </label>
        </div>

        {helpText !== undefined && <S.Help>{helpText}</S.Help>}
      </S.RadioButton>
    );
  }
);

type Props<T = HTMLInputElement> = {
  id: string;
  labelText: string;
  errorText?: string;
  helpText?: string;
  className?: string;
} & React.InputHTMLAttributes<T>;
