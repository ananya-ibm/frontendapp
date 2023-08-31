/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Checkbox as CarbonCheckbox } from '@carbon/react';
import * as S from './Checkbox.styles';

export const Checkbox = React.forwardRef<HTMLInputElement>(
  (
    {
      id,
      name,
      onChange,
      onBlur,
      disabled,
      checked,
      defaultChecked,
      helpText,
      labelText,
      errorText,
      ...rest
    }: Props,
    ref
  ) => {
    return (
      <>
        <S.Checkbox isError={errorText !== undefined}>
          <CarbonCheckbox
            ref={ref}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            labelText={labelText}
            {...rest}
          />
        </S.Checkbox>
        {errorText !== undefined && <S.Error>{errorText}</S.Error>}
        {helpText !== undefined && errorText === undefined && <S.Help>{helpText}</S.Help>}
      </>
    );
  }
);

type Props<T = HTMLInputElement> = {
  id: string;
  labelText: string;
  errorText?: string;
  helpText?: string;
} & React.InputHTMLAttributes<T>;
