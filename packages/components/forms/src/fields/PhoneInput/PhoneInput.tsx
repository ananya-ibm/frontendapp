/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React from 'react';
import {
  TextInput as BaseTextInput,
  Dropdown as BaseDropdown
} from '@exo/frontend-components-base';
import * as S from './PhoneInput.styles';
import { ControlledFieldProps } from '../../helpers/types';
import { ControlledField } from '../../helpers/ControlledField';
import { CustomFormFieldWrapper } from '../../layout/CustomFormFieldWrapper/CustomFormFieldWrapper';

const defaultParse = (s: string) => {
  const arr = s.split(' ');
  return {
    prefix: arr?.[0] ?? '',
    number: arr.slice(1)?.join(' ') ?? ''
  };
};

export const PhoneInput = React.forwardRef(
  (
    {
      id,
      name,
      value,
      control,
      errorText,
      labelText,
      requiredLabelText = (isReq, label) => (isReq ? label : `${label} (optional)`),
      helpText,
      placeholderText,
      prefixPlaceholderText = '+XX',
      prefixes = [],
      isRequired,
      isDisabled,
      numberFormat,
      onChangeValue
    }: Props,
    /* @ts-ignore */
    // eslint-disable-next-line no-unused-vars
    ref
  ) => {
    const { parse, setPrefix, setNumber } = {
      parse: defaultParse,
      setPrefix: (s, p) => `${p} ${defaultParse(s).number}`,
      setNumber: (s, n) => `${defaultParse(s).prefix} ${n}`,
      ...(numberFormat ?? {})
    };

    return (
      <CustomFormFieldWrapper
        errorText={errorText}
        helpText={helpText}
        isRequired={isRequired}
        labelText={labelText}
        requiredLabelText={requiredLabelText}
      >
        <ControlledField
          render={({ field }) => {
            const { prefix, number } = field.value ? parse(field.value!) : { prefix: '', number: '' };

            return (
              <S.Row>
                <S.DropdownWrapper>
                  <BaseDropdown<Prefix>
                    id={`${id}-prefix`}
                    disabled={isDisabled}
                    variant={'default'}
                    dropdownLabel={prefixPlaceholderText}
                    labelText={''}
                    initialSelectedItem={prefixes.find(c => c.value === prefix)!}
                    selectedItem={prefixes.find(c => c.value === prefix) ?? null}
                    items={prefixes}
                    className="dropdown"
                    itemToString={c => c.value}
                    itemToElement={c => <span>{c.name}</span>}
                    onChange={e => field.onChange(setPrefix(field.value!, e!.value))}
                  />
                </S.DropdownWrapper>

                <BaseTextInput
                  id={id}
                  name={field.name}
                  disabled={isDisabled}
                  hideLabel
                  labelText=""
                  type="tel"
                  variant={'default'}
                  placeholder={placeholderText}
                  required={isRequired}
                  value={number}
                  onChange={e => field.onChange(setNumber(field.value!, e.currentTarget.value))}
                />
              </S.Row>
            );
          }}
          control={control}
          name={name}
          value={value ?? ''}
          onChangeValue={onChangeValue}
        />
      </CustomFormFieldWrapper>
    );
  }
);

type Props = ControlledFieldProps<string> & {
  // *******************************************************************
  // Common properties for all fields
  requiredLabelText?: (isReq: boolean, label: string) => string;
  isRequired?: boolean;

  // *******************************************************************
  // PhoneInput specific properties

  placeholderText?: string;
  prefixPlaceholderText?: string;

  prefixes?: Prefix[];

  numberFormat?: {
    parse: (phoneNumber: string) => { prefix: string; number: string };
    setPrefix: (phoneNumber: string, newPrefix: string) => string;
    setNumber: (phoneNumber: string, newNumber: string) => string;
  };
};

type Prefix = {
  value: string;
  name: string;
};
