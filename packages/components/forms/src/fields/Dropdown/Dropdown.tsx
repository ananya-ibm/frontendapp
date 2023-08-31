/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Dropdown as BaseDropdown } from '@exo/frontend-components-base';
import { ControlledFieldProps } from '../../helpers/types';
import { ControlledField } from '../../helpers/ControlledField';

export const Dropdown = React.forwardRef(
  (
    {
      id,
      name,
      value,
      control,
      isRequired,
      variant = 'default',
      errorText,
      requiredLabelText = (isReq, label) => (isReq ? label : `${label} (optional)`),
      labelText,
      helpText,
      placeholderText,
      isDisabled,
      items,
      onChangeValue
    }: Props,
    /* @ts-ignore */
    // eslint-disable-next-line no-unused-vars
    ref
  ) => {
    return (
      <ControlledField
        render={({ field }) => {
          return (
            <BaseDropdown
              id={id}
              disabled={isDisabled}
              errorText={errorText}
              helpText={helpText}
              variant={
                // eslint-disable-next-line no-nested-ternary
                variant === 'inline'
                  ? 'inline'
                  : 'default'
              }
              dropdownLabel={placeholderText ?? ''}
              labelText={requiredLabelText(!!isRequired, labelText ?? '')}
              initialSelectedItem={items.find(c => c.value === field.value)}
              selectedItem={items.find(c => c.value === field.value) ?? null}
              items={items}
              itemToString={c => c.name}
              onChange={e => field.onChange(e!.value)}
            />
          );
        }}
        onChangeValue={onChangeValue}
        control={control}
        name={name}
        value={value ?? ''}
      />
    );
  }
);

type Props = ControlledFieldProps<string> & {
  // *******************************************************************
  // Common properties for all fields
  requiredLabelText?: (isReq: boolean, label: string) => string;
  isRequired?: boolean;

  // *******************************************************************
  // Dropdown specific properties

  placeholderText?: string;
  items: Item[];
  variant: 'default' | 'inline';
};

type Item = {
  name: string;
  value?: string;
};
