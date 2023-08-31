/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import { TextInput as BaseTextInput } from '@exo/frontend-components-base';
import { UncontrolledFieldProps } from '../../helpers/types';

export const TextInput = React.forwardRef(
  (
    {
      id,
      name,
      value,
      errorText,
      labelText,
      requiredLabelText = (isReq, label) => (isReq ? label : `${label} (optional)`),
      helpText,
      placeholderText,
      isRequired,
      isDisabled,
      type = 'string',
      onChange,
      onBlur,
      control,
      onChangeValue
    }: Props,
    ref
  ) => {
    return (
      <BaseTextInput
        id={id ?? name}
        name={name ?? id}
        defaultValue={control ? value : undefined}
        value={control ? undefined : value}
        /* @ts-ignore */
        ref={ref}
        disabled={isDisabled}
        invalidText={errorText}
        hideLabel={labelText === undefined}
        invalid={errorText !== undefined && errorText !== ''}
        labelText={requiredLabelText(!!isRequired, labelText ?? '')}
        helperText={helpText}
        type={type === 'string' ? 'text' : type}
        placeholder={placeholderText}
        required={isRequired}
        onChange={e => {
          onChange?.(e);
          onChangeValue?.(e.currentTarget.value);
        }}
        onBlur={onBlur}
      />
    );
  }
);

type Props = UncontrolledFieldProps<string> & {
  // *******************************************************************
  // Common properties for all fields
  requiredLabelText?: (isReq: boolean, label: string) => string;
  isRequired?: boolean;

  // *******************************************************************
  // TextInput specific properties

  placeholderText?: string;
  type: 'string' | 'email' | 'password' | 'tel' | 'url';

  onChange?: ChangeEventHandler;
  onBlur?: FocusEventHandler;
};
