/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TextArea as BaseTextArea } from '@exo/frontend-components-base';
import { UncontrolledFieldProps } from '../../helpers/types';

export const TextArea = React.forwardRef<HTMLTextAreaElement>(
  (
    {
      id,
      name,
      value,
      errorText,
      labelText,
      helpText,
      requiredLabelText = (isReq, label) => (isReq ? label : `${label} (optional)`),
      placeholderText,
      isRequired,
      isDisabled,
      onChange,
      onBlur,
      onChangeValue,
      control
    }: Props,
    ref
  ) => {
    return (
      <BaseTextArea
        id={id}
        name={name}
        defaultValue={control ? value : undefined}
        value={control ? undefined : value}
        ref={ref}
        disabled={isDisabled}
        onChange={e => {
          onChange?.(e);
          onChangeValue?.(e.currentTarget.value);
        }}
        onBlur={onBlur}
        errorText={errorText}
        labelText={requiredLabelText(!!isRequired, labelText ?? '')}
        helpText={helpText}
        variant={'default'}
        placeholder={placeholderText}
        required={isRequired}
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
  // TextArea specific properties

  placeholderText?: string;
};
