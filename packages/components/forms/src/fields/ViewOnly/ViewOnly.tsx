/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ControlledField } from '../../helpers/ControlledField';
import { ControlledFieldProps } from '../../helpers/types';
import { CustomFormFieldWrapper } from '../../layout/CustomFormFieldWrapper/CustomFormFieldWrapper';

export const ViewOnly = React.forwardRef<HTMLInputElement>((props: Props, _ref) => {
  return (
    <ControlledField
      value={props.value ?? ''}
      control={props.control}
      name={props.name}
      render={({ field }) => {
        return (
          <CustomFormFieldWrapper
            labelText={props.labelText}
            isRequired={true}
            helpText={undefined}
            errorText={undefined}
          >
            {field.value === '' ? '-' : field.value ?? '-'}
          </CustomFormFieldWrapper>
        );
      }}
    />
  );
});

type Props = ControlledFieldProps<string>;
