/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { PhoneInput } from './PhoneInput';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { FormTest } from '../../helpers/FormTest';

export default {
  title: 'Components/Forms/Fields/PhoneInput',
  component: PhoneInput
};

const Wrapper = ({ render }) => {
  const { control } = useForm({ mode: 'onChange' });
  return render(control);
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <Wrapper render={control => <PhoneInput control={control} {...args} />} />
);
Default.args = {
  labelText: 'A phone-number field',
  placeholderText: '(0)8 3562376',
  id: 'phone',
  name: 'phone',
  prefixes: [
    { value: '+46', name: 'Sweden (+46)' },
    { value: '+41', name: 'UK (+41)' },
    { value: '+42', name: 'US (+42)' }
  ]
};

// ---------------------------------------------------------------------------------------------------

export const WithError = args => (
  <Wrapper render={control => <PhoneInput control={control} {...args} />} />
);
WithError.args = {
  ...Default.args,
  errorText: 'Some error text'
};

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = args => (
  <Wrapper render={control => <PhoneInput control={control} {...args} />} />
);
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
};

// ---------------------------------------------------------------------------------------------------

export const WithValue = args => (
  <Wrapper render={control => <PhoneInput control={control} {...args} />} />
);
WithValue.args = {
  ...Default.args,
  value: '+46 12345265'
};

// ---------------------------------------------------------------------------------------------------

export const OnFieldPanel = args => (
  <FieldPanel title="A fieldpanel">
    <Wrapper render={control => <PhoneInput control={control} {...args} />} />
  </FieldPanel>
);
OnFieldPanel.storyName = 'On FieldPanel';
OnFieldPanel.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const TestOnForm = args => (
  <FormTest
    data={'+46 (0)70 525362'}
    render={({ register, control }) => (
      <PhoneInput
        id="field"
        {...args}
        {...register('field', { required: true })}
        control={control}
      />
    )}
    renderStandalone={({ value, onChangeValue }) => (
      <PhoneInput id="field" {...args} value={value} onChangeValue={onChangeValue} />
    )}
  />
);
TestOnForm.args = {
  ...Default.args
};
