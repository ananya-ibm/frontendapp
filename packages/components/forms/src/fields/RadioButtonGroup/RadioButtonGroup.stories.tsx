/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { RadioButtonGroup } from './RadioButtonGroup';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { FormTest } from '../../helpers/FormTest';

export default {
  title: 'Components/Forms/Fields/RadioButtonGroup',
  component: RadioButtonGroup
};

const Wrapper = ({ render }) => {
  const { control } = useForm({ mode: 'onBlur' });
  return render(control);
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <Wrapper render={control => <RadioButtonGroup control={control} {...args} />} />
);
Default.args = {
  id: 'id',
  name: 'name',
  labelText: 'Some label',
  items: [
    { value: 'red', name: 'Red' },
    { value: 'green', name: 'Green' },
    { value: 'blue', name: 'Blue' }
  ]
};

// ---------------------------------------------------------------------------------------------------

export const WithError = args => (
  <Wrapper render={control => <RadioButtonGroup control={control} {...args} />} />
);
WithError.args = {
  ...Default.args,
  errorText: 'Some error text'
};

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = args => (
  <Wrapper render={control => <RadioButtonGroup control={control} {...args} />} />
);
WithHelpText.args = {
  ...Default.args,
  helpText: 'Some help text'
};

// ---------------------------------------------------------------------------------------------------

export const OnFieldPanel = args => (
  <FieldPanel title="A fieldset">
    <Wrapper render={control => <RadioButtonGroup control={control} {...args} />} />
  </FieldPanel>
);
OnFieldPanel.storyName = 'On FieldPanel';
OnFieldPanel.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const TestOnForm = args => (
  <FormTest
    data={'red'}
    render={({ register, control }) => (
      <RadioButtonGroup
        {...args}
        id="field"
        {...register('field', { required: true })}
        control={control}
      />
    )}
    renderStandalone={undefined}
  />
);
TestOnForm.args = {
  ...Default.args
};
