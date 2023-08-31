/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CustomFormFieldWrapper } from '@exo/frontend-components-forms';
import { Checkbox } from '@exo/frontend-components-base';
import { RadioButtonGroup, Dropdown } from '@exo/frontend-components-forms';

export const FormOptions = (props: Props) => {
  if (props.type === 'CHECKBOX') {
    return (
      <CustomFormFieldWrapper
        labelText={props.title}
        errorText={undefined}
        isRequired={props.isRequired}
        requiredLabelText={undefined}
        helpText={undefined}
      >
        {props.items.map(it => (
          <Checkbox
            key={`${props.name}_${it.value}`}
            id={`${props.name}_${it.value}`}
            name={props.name}
            value={it.value}
            labelText={it.text}
            defaultChecked={it.selected}
          />
        ))}
      </CustomFormFieldWrapper>
    );
  } else if (props.type === 'RADIO') {
    return (
      <CustomFormFieldWrapper
        labelText={props.title}
        errorText={undefined}
        isRequired={props.isRequired}
        requiredLabelText={undefined}
        helpText={undefined}
      >
        <RadioButtonGroup
          id={props.id}
          name={props.name}
          items={props.items.map(it => ({ value: it.value, name: it.text }))}
        />
      </CustomFormFieldWrapper>
    );
  } else if (props.type === 'DROP_DOWN') {
    return (
      <CustomFormFieldWrapper
        labelText={props.title}
        errorText={undefined}
        isRequired={props.isRequired}
        requiredLabelText={undefined}
        helpText={undefined}
      >
        <Dropdown
          id={props.id}
          isRequired={props.isRequired}
          name={props.name}
          placeholderText={props.name}
          items={props.items.map(it => ({ value: it.value, name: it.text }))}
        />
      </CustomFormFieldWrapper>
    );
  } else {
    console.log('FormOptions', props);
    return <div>FormOptions Not Implemented</div>;
  }
};

type Props = {
  type: 'CHECKBOX' | 'RADIO' | 'DROP_DOWN' | any;
  isRequired: boolean;
  id: string;
  name: string;
  title: string;
  items: {
    disabled: boolean;
    selected: boolean;
    text: string;
    value: string;
  }[];
};
