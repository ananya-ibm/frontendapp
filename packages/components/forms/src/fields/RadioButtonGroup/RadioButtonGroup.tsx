/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import {
  RadioButtonGroup as BaseRadioButtonGroup,
  RadioButton as BaseRadioButton
} from '@exo/frontend-components-base';
import { ControlledFieldProps } from '../../helpers/types';
import { ControlledField } from '../../helpers/ControlledField';

export const RadioButtonGroup = React.forwardRef(
  (
    {
      id,
      name,
      value,
      control,
      errorText,
      labelText,
      helpText,
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
        render={({ field }) => (
          <BaseRadioButtonGroup
            labelText={labelText ?? ''}
            name={field.name}
            value={field.value}
            disabled={isDisabled}
            errorText={errorText}
            helpText={helpText}
            defaultValue={field.value}
            onChange={(e: any) => {
              field.onChange(e);
            }}
          >
            {items.map(i => (
              <BaseRadioButton
                key={`${id}_${i.value}`}
                value={i.value}
                id={`${id}_${i.value}`}
                labelText={i.name}
              />
            ))}
          </BaseRadioButtonGroup>
        )}
        control={control}
        name={name}
        value={value ?? ''}
        onChangeValue={onChangeValue}
      />
    );
  }
);

type Props = ControlledFieldProps<string> & {
  items: Item[];
};

type Item = {
  name: string;
  value?: string;
};
