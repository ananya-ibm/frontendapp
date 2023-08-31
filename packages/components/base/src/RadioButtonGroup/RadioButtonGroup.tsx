/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { FormGroup, RadioButtonGroup as CarbonRadioButtonGroup } from '@carbon/react';
import React from 'react';
import * as S from './RadioButtonGroup.styles';

export const RadioButtonGroup = ({
  id,
  labelText,
  value,
  defaultValue,
  onChange,
  disabled,
  errorText,
  helpText,
  name,
  className,
  children
}: Props) => {
  return (
    <FormGroup id={id} legendText={labelText ?? ''} className={className}>
      <S.RadioButtonGroup isError={errorText !== undefined}>
        <CarbonRadioButtonGroup
          name={name}
          onChange={onChange}
          valueSelected={value}
          orientation="vertical"
          disabled={disabled}
          defaultSelected={defaultValue}
        >
          {children}
        </CarbonRadioButtonGroup>
      </S.RadioButtonGroup>
      {errorText !== undefined && <S.Error>{errorText}</S.Error>}
      {helpText !== undefined && errorText === undefined && <S.Help>{helpText}</S.Help>}
    </FormGroup>
  );
};

type Props<T = HTMLElement> = {
  id?: string;
  name: string;
  value: string;
  defaultValue?: string;
  onChange: (newVal: string, name: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  labelText?: string;
  errorText?: string;
  helpText?: string;
  children: any;
  className?: string;
} & Omit<React.HTMLAttributes<T>, 'onChange'>;
