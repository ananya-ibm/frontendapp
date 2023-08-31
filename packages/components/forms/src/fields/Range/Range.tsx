/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Slider } from '@exo/frontend-components-base';
import { ControlledFieldProps } from '../../helpers/types';
import { ControlledField } from '../../helpers/ControlledField';

export const Range = React.forwardRef(
  (
    {
      id,
      name,
      value,
      labelText,
      requiredLabelText = (isReq, label) => (isReq ? label : `${label} (optional)`),
      isRequired,
      onChangeValue,
      min,
      max,
      control,
      /* @ts-ignore */
      errorText,
      /* @ts-ignore */
      helpText,
      /* @ts-ignore */
      isDisabled,
      step = 1
    }: Props,

    /* @ts-ignore */
    // eslint-disable-next-line no-unused-vars
    ref
  ) => {
    return (
      <ControlledField
        render={({ field }) => {
          return (
            <Slider
              id={id}
              name={name}
              value={field.value ?? 0}
              step={step}
              min={min}
              max={max}
              /* TODO: This seem to rely on a later carbon version */
              /* disabled={isDisabled ?? false} */
              onChange={e => {
                field.onChange?.(e);
              }}
              /* 
              invalidText={errorText}
              invalid={errorText !== undefined && errorText !== ''} 
            */
              labelText={requiredLabelText(!!isRequired, labelText ?? '')}
              /* helperText={helpText} */
              variant={'default'}
              /* required={isRequired} */
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

type Props = ControlledFieldProps<number> & {
  requiredLabelText?: (isReq: boolean, label: string) => string;
  isRequired?: boolean;

  min: number;
  max: number;
  step?: number;
};
