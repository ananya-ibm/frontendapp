/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Checkbox as BaseCheckbox } from '@exo/frontend-components-base';
import { UncontrolledFieldProps } from '../../helpers/types';

export const Checkbox = React.forwardRef<HTMLInputElement>(
  (
    {
      id,
      name,
      value,
      errorText,
      labelText,
      helpText,
      isDisabled,
      onChange,
      onChangeValue,
      onBlur,
      control
    }: Props,
    ref
  ) => {
    return (
      <BaseCheckbox
        ref={ref}
        id={id}
        name={name}
        errorText={errorText}
        helpText={helpText}
        onChange={(checked, _id, event) => {
          onChange?.(event);
          onChangeValue?.(checked);
        }}
        onBlur={onBlur}
        disabled={isDisabled}
        labelText={labelText ?? ''}
        defaultChecked={control ? value === true : undefined}
        checked={control ? undefined : !!value}
      />
    );
  }
);

type Props = UncontrolledFieldProps<boolean>;
